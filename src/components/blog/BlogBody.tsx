import Image from 'next/image';
import type { BlogBlock } from '@/content/blog';
import { RichText } from '@/components/blog/RichText';

type Props = {
  blocks: BlogBlock[];
};

export function BlogBody({ blocks }: Props) {
  return (
    <div className="mt-12 max-w-2xl">
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return (
            <p key={i} className="mt-6 text-[1.05rem] leading-[1.75] text-ink">
              <RichText text={block.text} />
            </p>
          );
        }
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="mt-14 text-3xl text-ink md:text-4xl">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3 key={i} className="mt-10 text-2xl text-ink">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'dish') {
          return (
            <h3 key={i} className="dish-name mt-10 text-2xl">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="mt-6 list-disc space-y-3 pl-5 text-[1.05rem] leading-[1.75] text-ink">
              {block.items.map((item) => (
                <li key={item.slice(0, 48)}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'img') {
          return (
            <figure key={i} className="mt-10">
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                className="h-auto w-full object-cover"
                sizes="(min-width: 768px) 42rem, 100vw"
              />
            </figure>
          );
        }
        return (
          <aside
            key={i}
            className="mt-10 border-l-2 border-gold pl-5 text-[1.05rem] leading-[1.75] text-muted"
          >
            <RichText text={block.text} />
          </aside>
        );
      })}
    </div>
  );
}
