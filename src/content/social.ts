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
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/restaurant-sahib/',
    label: 'LinkedIn',
  },
] as const;

export type SocialId = (typeof socialLinks)[number]['id'];
