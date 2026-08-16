export type LocationId = 'pointe-claire' | 'dorval';

export type Location = {
  id: LocationId;
  name: { en: string; fr: string; hi: string };
  addressLines: string[];
  postal: string;
  phone: string;
  phoneHref: string;
  hours: { en: string; fr: string; hi: string };
  reserveUrl: string;
  orderUrl: string;
  justBookMeUrl: string;
  mapUrl: string;
  note?: { en: string; fr: string; hi: string };
};

export const locations: Location[] = [
  {
    id: 'pointe-claire',
    name: { en: 'Pointe-Claire', fr: 'Pointe-Claire', hi: 'प्वाइंट-क्लेयर' },
    addressLines: ['225B Hymus Blvd.', 'Pointe-Claire, QC'],
    postal: 'H9R 1G4',
    phone: '514.426.1121',
    phoneHref: 'tel:+15144261121',
    hours: {
      en: 'Wed–Sun 11:30–22:00. Closed Mon–Tue.',
      fr: 'Mer–dim 11 h 30–22 h. Fermé lun–mar.',
      hi: 'बुध–रवि 11:30–22:00. सोम–मंगल बंद।',
    },
    reserveUrl:
      'https://www.tbdine.com/book/restaurant/sahib?idApp=1390&language=en-us',
    orderUrl: 'http://orderonline.sahib.ca/',
    justBookMeUrl: 'https://justbookme.ca/book/sahib-pointe-claire',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=225B+Hymus+Blvd+Pointe-Claire+QC',
  },
  {
    id: 'dorval',
    name: { en: 'Dorval', fr: 'Dorval', hi: 'डोरवाल' },
    addressLines: ['636 Chem. du Bord-du-Lac-Lakeshore', 'Dorval, QC'],
    postal: 'H9S 2B6',
    phone: '514.307.2442',
    phoneHref: 'tel:+15143072442',
    hours: {
      en: 'Tue–Sun 11:30–22:00. Closed Mon.',
      fr: 'Mar–dim 11 h 30–22 h. Fermé lundi.',
      hi: 'मंगल–रवि 11:30–22:00. सोमवार बंद।',
    },
    reserveUrl: 'https://widgets.libroreserve.com/WEB/QC014745582811/book',
    orderUrl: 'https://sahibindianrestaurant.order-online.ai/',
    justBookMeUrl: 'https://justbookme.ca/book/sahib-dorval',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=636+Chemin+du+Bord-du-Lac+Dorval+QC',
    note: {
      en: 'Outdoor seating is not guaranteed.',
      fr: 'Les places en terrasse ne sont pas garanties.',
      hi: 'बाहर की सीट की गारंटी नहीं है।',
    },
  },
];

export const cateringEmail = 'rajiv@sahib.ca';
