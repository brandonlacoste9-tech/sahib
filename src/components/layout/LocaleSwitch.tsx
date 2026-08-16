'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const labels = {
  en: 'EN',
  fr: 'FR',
  hi: 'हिन्दी',
} as const;

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label="Language" className="flex items-baseline gap-3">
      {routing.locales.map((code) => {
        const current = code === locale;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            aria-current={current ? 'page' : undefined}
            className={
              current
                ? 'text-sm text-teal'
                : 'text-sm text-muted hover:text-ink'
            }
          >
            {labels[code]}
          </Link>
        );
      })}
    </nav>
  );
}
