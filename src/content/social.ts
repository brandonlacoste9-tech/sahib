export const socialLinks = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/restaurantsahib/',
    label: 'Instagram',
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/restaurantsahib',
    label: 'Facebook',
  },
  {
    id: 'indeed',
    href: 'https://ca.indeed.com/cmp/Restaurant-Sahib-Inc',
    label: 'Indeed',
  },
] as const;

export type SocialId = (typeof socialLinks)[number]['id'];
