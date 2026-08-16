const localeMap = { en: 'en-CA', fr: 'fr-CA', hi: 'hi-IN' } as const;

export function formatPrice(cents: number, locale: 'en' | 'fr' | 'hi'): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: 'CAD',
  }).format(cents / 100);
}
