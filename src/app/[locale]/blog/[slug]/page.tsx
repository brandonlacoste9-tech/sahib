import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BlogBody } from '@/components/blog/BlogBody';
import { getPost, getPostSlugs } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { formatPostDate } from '@/lib/blog-date';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const loc = locale as Locale;

  return (
    <article className="mx-auto max-w-[1120px] px-6 py-20 md:py-28">
      <Link href="/blog" className="text-sm tracking-wide text-teal">
        {t('back')}
      </Link>
      <h1 className="mt-8 max-w-4xl text-4xl leading-[1.1] text-ink md:text-6xl">
        {post.title}
      </h1>
      <p className="mt-6 text-sm tracking-wide text-muted">
        {t('by', { author: post.author })}
        <span aria-hidden="true"> · </span>
        {formatPostDate(post.publishedAt, loc)}
        <span aria-hidden="true"> · </span>
        {t('readMinutes', { n: post.readMinutes })}
      </p>
      <div className="mt-10 max-w-3xl">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          width={post.cover.width}
          height={post.cover.height}
          priority
          className="h-auto w-full object-cover"
          sizes="(min-width: 768px) 48rem, 100vw"
        />
      </div>
      <BlogBody blocks={post.body} />
    </article>
  );
}
