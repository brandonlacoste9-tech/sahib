import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeading } from '@/components/brand/PageHeading';
import { MenuList } from '@/components/menu/MenuList';
import type { Locale } from '@/i18n/routing';
import { loadFood } from '@/lib/load-menu';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');
  const data = loadFood();

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-16 md:py-20">
      <PageHeading>{t('menu')}</PageHeading>
      <div className="mt-10">
        <MenuList data={data} locale={locale as Locale} />
      </div>
    </section>
  );
}
