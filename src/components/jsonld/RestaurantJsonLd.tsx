import { locations, type Location, type LocationId } from '@/content/locations';
import { socialLinks } from '@/content/social';

const siteUrl = 'https://www.sahib.ca';

const daysOpen: Record<LocationId, string[]> = {
  'pointe-claire': [
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  dorval: [
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
};

function postalAddress(loc: Location) {
  const [street, cityLine] = loc.addressLines;
  const [locality, region = 'QC'] = cityLine
    .split(',')
    .map((part) => part.trim());

  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: locality,
    addressRegion: region,
    postalCode: loc.postal,
    addressCountry: 'CA',
  };
}

function restaurantNode(loc: Location) {
  return {
    '@type': 'Restaurant',
    '@id': `${siteUrl}/#${loc.id}`,
    name: `Sahib ${loc.name.en}`,
    servesCuisine: 'Indian',
    telephone: loc.phoneHref.replace('tel:', ''),
    address: postalAddress(loc),
    hasMap: loc.mapUrl,
    url: `${siteUrl}/en/contact#${loc.id}`,
    sameAs: socialLinks.map((item) => item.href),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: daysOpen[loc.id],
      opens: '11:30',
      closes: '22:00',
    },
  };
}

export function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': locations.map(restaurantNode),
        }),
      }}
    />
  );
}
