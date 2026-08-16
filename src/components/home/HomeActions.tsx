'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  LocationSheet,
  type LocationSheetAction,
} from '@/components/layout/LocationSheet';

const sheetActions: LocationSheetAction[] = ['reserve', 'order', 'justbookme'];

export function HomeActions() {
  const t = useTranslations('nav');
  const [action, setAction] = useState<LocationSheetAction | null>(null);

  return (
    <>
      <ul className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-4">
        {sheetActions.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => setAction(item)}
              className="text-lg tracking-wide text-teal hover:text-ink"
            >
              {item === 'justbookme' ? 'JustBookMe' : t(item)}
            </button>
          </li>
        ))}
        <li>
          <Link
            href="/menu"
            className="text-lg tracking-wide text-teal hover:text-ink"
          >
            {t('menu')}
          </Link>
        </li>
      </ul>
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
