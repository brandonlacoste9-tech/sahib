export const legacyRedirects = [
  { source: '/restaurant-pub-menu', destination: '/en/pub', permanent: true },
  {
    source: '/copy-of-contact-us-pointe-claire',
    destination: '/en/contact#dorval',
    permanent: true,
  },
  { source: '/contact-us', destination: '/en/contact#pointe-claire', permanent: true },
  { source: '/blog', destination: '/en/blog', permanent: true },
  { source: '/post/:slug', destination: '/en/blog/:slug', permanent: true },
  {
    source: '/:locale(en|fr|hi)/post/:slug',
    destination: '/:locale/blog/:slug',
    permanent: true,
  },
];
