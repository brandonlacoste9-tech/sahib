import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getPost, getPosts, getPostSlugs } from '../src/content/blog';
import { formatPostDate } from '../src/lib/blog-date';

describe('blog', () => {
  it('keeps the four live Wix posts, newest first', () => {
    expect(getPostSlugs()).toEqual([
      'what-is-balti-cooking-the-birmingham-curry-tradition-behind-sahib-s-balti-pot-dishes',
      'indian-catering-for-montreal-events-what-to-know-before-you-book',
      'indian-buffet-vs-a-la-carte-which-is-right-for-your-visit-to-an-indian-restaurant',
      'what-to-expect-at-an-indian-buffet-a-first-timer-s-guide',
    ]);
    expect(getPosts().map((p) => p.publishedAt)).toEqual([
      '2026-08-13',
      '2026-07-21',
      '2026-06-20',
      '2026-05-20',
    ]);
  });

  it('credits Emilie Chopra and ships local covers', () => {
    for (const post of getPosts()) {
      expect(post.author).toBe('Emilie Chopra');
      expect(post.cover.src.startsWith('/blog/')).toBe(true);
      expect(existsSync(resolve(__dirname, `../public${post.cover.src}`))).toBe(
        true
      );
      expect(post.body.length).toBeGreaterThan(4);
    }
  });

  it('resolves a post by Wix slug', () => {
    const post = getPost(
      'what-is-balti-cooking-the-birmingham-curry-tradition-behind-sahib-s-balti-pot-dishes'
    );
    expect(post?.title).toMatch(/Balti Cooking/);
  });

  it('formats dates in EN, FR, and HI', () => {
    expect(formatPostDate('2026-08-13', 'en')).toMatch(/August/);
    expect(formatPostDate('2026-08-13', 'fr')).toMatch(/août/i);
    expect(formatPostDate('2026-08-13', 'hi')).toMatch(/अगस्त/);
  });
});
