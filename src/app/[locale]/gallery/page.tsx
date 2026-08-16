import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeading } from '@/components/brand/PageHeading';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <PageHeading>{t('gallery')}</PageHeading>
      <GalleryGrid />
    </section>
  );
}
