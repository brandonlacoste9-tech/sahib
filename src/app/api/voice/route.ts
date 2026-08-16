import { NextResponse } from 'next/server';
import { elevenLabsConfig, parseVoiceText } from '@/lib/elevenlabs';

export async function POST(request: Request) {
  const { apiKey, voiceId } = elevenLabsConfig();
  if (!apiKey) {
    return NextResponse.json({ error: 'Voice not configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const text = parseVoiceText(body);
  if (!text) {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          speed: 0.96,
        },
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Voice failed' }, { status: 502 });
  }

  const audio = await res.arrayBuffer();
  return new NextResponse(audio, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  });
}
