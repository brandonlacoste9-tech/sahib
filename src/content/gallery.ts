export type GalleryAlbumId = 'dorval' | 'pointe-claire';

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const albums: Record<GalleryAlbumId, GalleryPhoto[]> = {
  dorval: [
    {
      src: '/gallery/dorval/01.jpg',
      alt: 'Dining room with teal booths at Sahib Dorval',
      width: 2048,
      height: 2048,
    },
    {
      src: '/gallery/dorval/02.jpg',
      alt: 'Bar and set tables at Sahib Dorval',
      width: 2048,
      height: 2048,
    },
    {
      src: '/gallery/dorval/03.jpg',
      alt: 'Window tables in the dining room at Sahib Dorval',
      width: 2048,
      height: 2048,
    },
    {
      src: '/gallery/dorval/04.jpg',
      alt: 'Outdoor terrace at Sahib Dorval',
      width: 1536,
      height: 2048,
    },
    {
      src: '/gallery/dorval/05.jpg',
      alt: 'Cocktails poured into Sahib glasses',
      width: 2048,
      height: 2048,
    },
    {
      src: '/gallery/dorval/06.jpg',
      alt: 'Beer taps and bottles at the Sahib Dorval bar',
      width: 2048,
      height: 2048,
    },
    {
      src: '/gallery/dorval/07.jpg',
      alt: 'Pani puri plated at Sahib',
      width: 2048,
      height: 2048,
    },
    {
      src: '/gallery/dorval/08.jpg',
      alt: 'Papadum cones at Sahib Dorval',
      width: 2048,
      height: 2048,
    },
    {
      src: '/gallery/dorval/09.jpg',
      alt: 'Sahib Dorval staff Sivana, Sam and Grace',
      width: 1884,
      height: 1760,
    },
  ],
  'pointe-claire': [
    {
      src: '/gallery/pointe-claire/01.jpg',
      alt: 'Nataraja statue at the entrance to Sahib Pointe-Claire',
      width: 972,
      height: 648,
    },
    {
      src: '/gallery/pointe-claire/02.jpg',
      alt: 'Dining room at Sahib Pointe-Claire',
      width: 972,
      height: 648,
    },
    {
      src: '/gallery/pointe-claire/03.jpg',
      alt: 'Buffet line at Sahib Pointe-Claire',
      width: 972,
      height: 648,
    },
  ],
};

export const albumOrder: GalleryAlbumId[] = ['dorval', 'pointe-claire'];
