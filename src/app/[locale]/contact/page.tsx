import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20">
      <h1 className="text-5xl text-ink md:text-6xl">{t('contact')}</h1>
    </section>
  );
}
