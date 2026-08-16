import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeading } from '@/components/brand/PageHeading';
import { getPosts } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { formatPostDate } from '@/lib/blog-date';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('title'),
    description: t('lead'),
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const loc = locale as Locale;
  const items = getPosts();

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <PageHeading>{t('title')}</PageHeading>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{t('lead')}</p>
      <ul className="mt-16 grid gap-16 md:grid-cols-2">
        {items.map((post, index) => (
          <li key={post.slug}>
            <article>
              <Link href={`/blog/${post.slug}`} className="group block">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  width={post.cover.width}
                  height={post.cover.height}
                  priority={index === 0}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 768px) 520px, 100vw"
                />
                <h2 className="mt-6 text-3xl text-ink group-hover:text-teal md:text-4xl">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-3 text-sm tracking-wide text-muted">
                {formatPostDate(post.publishedAt, loc)}
                <span aria-hidden="true"> · </span>
                {t('readMinutes', { n: post.readMinutes })}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-teal">
                {t('more')}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
