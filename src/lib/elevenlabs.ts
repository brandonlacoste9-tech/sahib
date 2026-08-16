export const DEFAULT_SAHIB_VOICE = '8oCRqOcDUgRwXV5F71Ea';
export const FALLBACK_PREMADE_VOICE = 'JBFqnCBsd6RMkjVDRZzb';

export function parseVoiceText(body: unknown): string | null {
  if (!body || typeof body !== 'object') return null;
  if (!('text' in body) || typeof body.text !== 'string') return null;
  const text = body.text.trim();
  if (text.length < 1 || text.length > 500) return null;
  return text;
}

export function elevenLabsConfig() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() ?? '';
  const voiceId =
    process.env.ELEVENLABS_VOICE_ID?.trim() || DEFAULT_SAHIB_VOICE;
  return { apiKey, voiceId };
}
