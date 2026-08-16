import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeading } from '@/components/brand/PageHeading';
import { CateringForm } from '@/components/catering/CateringForm';

type Props = {
  params: Promise<{ locale: string }>;
};

const blocks = ['weddings', 'corporate', 'private'] as const;

export default async function CateringPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catering');

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <PageHeading>{t('title')}</PageHeading>

      <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-12">
        {blocks.map((key) => (
          <article key={key}>
            <h2 className="text-3xl text-ink md:text-4xl">{t(`${key}Title`)}</h2>
            <p className="mt-4 leading-relaxed text-muted">{t(`${key}Body`)}</p>
          </article>
        ))}
      </div>

      <div className="mt-20 border-t border-line pt-16">
        <h2 className="text-3xl text-ink md:text-4xl">{t('formTitle')}</h2>
        <CateringForm />
      </div>
    </section>
  );
}
