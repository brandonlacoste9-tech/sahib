'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  LocationSheet,
  type LocationSheetAction,
} from '@/components/layout/LocationSheet';

const actions: LocationSheetAction[] = ['reserve', 'order', 'justbookme'];

export function ThumbBar() {
  const t = useTranslations('nav');
  const [action, setAction] = useState<LocationSheetAction | null>(null);

  return (
    <>
      <nav
        aria-label={t('justbookme')}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper md:hidden"
      >
        <ul className="grid grid-cols-3">
          {actions.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => setAction(item)}
                className="flex w-full items-center justify-center px-2 py-3.5 text-sm tracking-wide text-ink"
              >
                {item === 'justbookme' ? 'JustBookMe' : t(item)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {action ? (
        <LocationSheet
          action={action}
          open
          onClose={() => setAction(null)}
        />
      ) : null}
    </>
  );
}
