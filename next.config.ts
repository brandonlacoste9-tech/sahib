import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { legacyRedirects } from './src/lib/redirects';

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
