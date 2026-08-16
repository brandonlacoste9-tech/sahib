import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Libre_Baskerville, Inter } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ThumbBar } from '@/components/layout/ThumbBar';
import { routing } from '@/i18n/routing';

const heading = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('site'),
      template: `%s · ${t('site')}`,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main id="content" tabIndex={-1} className="flex-1 pb-24 outline-none md:pb-0">
            {children}
          </main>
          <SiteFooter />
          <ThumbBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
