import type { Locale } from '@/i18n/routing';

const localeTag: Record<Locale, string> = {
  en: 'en-CA',
  fr: 'fr-CA',
  hi: 'hi-IN',
};

export function formatPostDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTag[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Toronto',
  }).format(new Date(`${iso}T12:00:00`));
}
