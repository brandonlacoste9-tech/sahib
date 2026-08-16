import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeading } from '@/components/brand/PageHeading';

type Props = {
  params: Promise<{ locale: string }>;
};

const chapters = ['kitchen', 'buffet', 'pub', 'visit'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('lead'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <PageHeading>{t('title')}</PageHeading>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{t('lead')}</p>
      <div className="mt-16 max-w-2xl">
        {chapters.map((key) => (
          <article key={key} className="mt-14 first:mt-0">
            <h2 className="text-3xl text-ink md:text-4xl">{t(`${key}Title`)}</h2>
            <p className="mt-5 text-[1.05rem] leading-[1.75] text-ink">{t(key)}</p>
          </article>
        ))}
        <p className="mt-16 text-sm tracking-wide text-muted">{t('founded')}</p>
      </div>
    </section>
  );
}
