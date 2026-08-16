'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { albumOrder, albums, type GalleryAlbumId } from '@/content/gallery';
import { locations } from '@/content/locations';
import type { Locale } from '@/i18n/routing';

export function GalleryGrid() {
  const locale = useLocale() as Locale;
  const t = useTranslations('sheet');
  const [album, setAlbum] = useState<GalleryAlbumId>('dorval');
  const [open, setOpen] = useState<number | null>(null);
  const photos = albums[album];
  const photo = open !== null ? photos[open] : null;

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <div
        role="tablist"
        aria-label={locations
          .map((loc) => loc.name[locale])
          .join(' · ')}
        className="mt-12 flex gap-8 border-b border-line"
      >
        {albumOrder.map((id) => {
          const loc = locations.find((item) => item.id === id);
          const selected = album === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setAlbum(id);
                setOpen(null);
              }}
              className={
                selected
                  ? 'border-b-2 border-teal pb-3 text-teal'
                  : 'pb-3 text-muted hover:text-ink'
              }
            >
              {loc?.name[locale] ?? id}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="relative block aspect-square w-full overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {photo ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 md:p-10">
          <button
            type="button"
            className="absolute inset-0"
            aria-label={t('close')}
            onClick={() => setOpen(null)}
          />
          <figure className="relative z-10 max-h-full max-w-5xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="max-h-[85vh] w-auto object-contain"
              priority
            />
            <figcaption className="sr-only">{photo.alt}</figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-6 top-6 text-sm tracking-wide text-paper hover:text-paper"
          >
            {t('close')}
          </button>
        </div>
      ) : null}
    </>
  );
}
