'use client';

import { useEffect, useId } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { locations } from '@/content/locations';
import type { Locale } from '@/i18n/routing';

export type LocationSheetAction = 'reserve' | 'order' | 'justbookme';

type LocationSheetProps = {
  action: LocationSheetAction;
  open: boolean;
  onClose: () => void;
};

function hrefFor(
  action: LocationSheetAction,
  loc: (typeof locations)[number]
) {
  if (action === 'reserve') return loc.reserveUrl;
  if (action === 'order') return loc.orderUrl;
  return `/book/${loc.justBookMeSlug}`;
}

export function LocationSheet({ action, open, onClose }: LocationSheetProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-ink/20"
        aria-label={t('sheet.close')}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[36rem] border-t border-line bg-paper px-6 pb-8 pt-7 md:border"
      >
        <div className="flex items-start justify-between gap-6">
          <h2
            id={titleId}
            className="font-heading text-3xl text-ink md:text-4xl"
          >
            {t('sheet.pickLocation')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm tracking-wide text-muted hover:text-ink"
          >
            {t('sheet.close')}
          </button>
        </div>
        {action === 'justbookme' ? (
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
            {t('nav.justbookmeHint')}
          </p>
        ) : null}
        <ul className="mt-8 flex flex-col gap-6">
          {locations.map((loc) => {
            const href = hrefFor(action, loc);
            const inner = (
              <>
                <span className="block font-heading text-2xl text-teal">
                  {loc.name[locale]}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {loc.addressLines.join(', ')}
                </span>
              </>
            );
            return (
              <li key={loc.id}>
                {action === 'justbookme' ? (
                  <Link href={href} onClick={onClose} className="group block text-left">
                    {inner}
                  </Link>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block text-left"
                  >
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
