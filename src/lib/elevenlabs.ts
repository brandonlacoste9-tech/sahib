export const PIERRE_VOICE = 'SLhJQg3VdZI7WdEazpYM';
export const THIERRY_VOICE = 'mVjOqyqTPfwlXPjV5sjX';
export const DEFAULT_SAHIB_VOICE = PIERRE_VOICE;
export const FALLBACK_PREMADE_VOICE = 'JBFqnCBsd6RMkjVDRZzb';

export type VoiceLocale = 'en' | 'fr' | 'hi';

export function parseVoiceRequest(body: unknown): {
  text: string;
  locale: VoiceLocale;
} | null {
  if (!body || typeof body !== 'object') return null;
  if (!('text' in body) || typeof body.text !== 'string') return null;
  const text = body.text.trim();
  if (text.length < 1 || text.length > 500) return null;
  const raw =
    'locale' in body && typeof body.locale === 'string' ? body.locale : 'en';
  const locale: VoiceLocale =
    raw === 'fr' || raw === 'hi' ? raw : 'en';
  return { text, locale };
}

export function voiceIdForLocale(locale: VoiceLocale): string {
  if (locale === 'fr') {
    return process.env.ELEVENLABS_VOICE_ID_FR?.trim() || THIERRY_VOICE;
  }
  return process.env.ELEVENLABS_VOICE_ID?.trim() || DEFAULT_SAHIB_VOICE;
}

export function elevenLabsConfig(locale: VoiceLocale = 'en') {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim() ?? '';
  return { apiKey, voiceId: voiceIdForLocale(locale) };
}
