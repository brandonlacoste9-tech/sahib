import { NextResponse } from 'next/server';
import {
  FALLBACK_PREMADE_VOICE,
  elevenLabsConfig,
  parseVoiceRequest,
} from '@/lib/elevenlabs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = parseVoiceRequest(body);
  if (!parsed) {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
  }

  const { apiKey, voiceId } = elevenLabsConfig(parsed.locale);
  if (!apiKey) {
    return NextResponse.json({ error: 'Voice not configured' }, { status: 503 });
  }

  const { text } = parsed;

  const payload = JSON.stringify({
    text: `<break time="0.5s" />${text}`,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.55,
      similarity_boost: 0.75,
      speed: 0.96,
    },
  });

  const first = await speak(apiKey, voiceId, payload);
  const res =
    first.ok || voiceId === FALLBACK_PREMADE_VOICE
      ? first
      : await speak(apiKey, FALLBACK_PREMADE_VOICE, payload);

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

function speak(apiKey: string, voiceId: string, payload: string) {
  return fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: payload,
    },
  );
}
