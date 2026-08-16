import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('scaffold', () => {
  it('declares next-intl', () => {
    const pkg = JSON.parse(
      readFileSync(resolve(__dirname, '../package.json'), 'utf8')
    );
    expect(pkg.dependencies['next-intl']).toBeTruthy();
  });
});
