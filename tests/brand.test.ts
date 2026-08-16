import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Indo-Arabic brand marks', () => {
  it('pairs Arabic صاحب with Hindi साहिब', () => {
    const src = readFileSync(
      resolve(__dirname, '../src/components/brand/ScriptPair.tsx'),
      'utf8'
    );
    expect(src).toContain('صاحب');
    expect(src).toContain('साहिब');
    expect(src).toContain('lang="ar"');
    expect(src).toContain('lang="hi"');
  });

  it('exposes a gold token for hairline flair', () => {
    const css = readFileSync(resolve(__dirname, '../src/app/globals.css'), 'utf8');
    expect(css).toContain('--gold');
    expect(css).toContain('jali');
  });

  it('sets menu dish names in gold Latin type', () => {
    const css = readFileSync(resolve(__dirname, '../src/app/globals.css'), 'utf8');
    const list = readFileSync(
      resolve(__dirname, '../src/components/menu/MenuList.tsx'),
      'utf8'
    );
    expect(css).toContain('.dish-name');
    expect(css).toMatch(/\.dish-name[\s\S]*var\(--gold\)/);
    expect(list).toContain('dish-name');
    expect(list).toContain('item.name.en');
  });
});
