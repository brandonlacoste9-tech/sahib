import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <p className="text-sm tracking-[0.18em] text-teal uppercase">{t('kicker')}</p>
      <h1 className="mt-6 max-w-3xl text-5xl leading-[1.1] text-ink md:text-7xl">
        {t('title')}
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{t('lead')}</p>
    </section>
  );
}
