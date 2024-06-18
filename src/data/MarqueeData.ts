import IPADPRO from '../../src/assets/store-card-40-ipad-pro-202405.jpeg';
import PRIDE from '../../src/assets/store-card-40-pride-202405.jpeg';
import IPHONE from '../../src/assets/store-card-40-iphone-15-pro-202309.jpeg';
import PENCIL from '../../src/assets/store-card-40-apple-pencil-202405.png';
import WATCH from '../../src/assets/store-card-40-watch-s9-202309.jpeg';
import MACBOOKAIR from '../../src/assets/store-card-40-macbook-air-202402.jpeg';
import WATCHULTRA from '../../src/assets/store-card-40-watch-ultra-202309.jpeg';
import MACBOOKPRO from '../../src/assets/store-card-40-vision-pro-202401.jpeg';
import AIRPODS from '../../src/assets/airpods-max-select-silver-202011.jpeg';
export interface ProductTypes {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  color?: string;
}

export const productsMarquee: ProductTypes[] = [
  {
    id: 1,
    name: 'IPAD PRO',
    description: 'ThinPossible',
    price: '$999',
    image: IPADPRO,
    color: 'black',
  },
  {
    id: 2,
    name: 'BRAIDED SOLO LOOP',
    description: 'Let your light shine',
    price: '$99',
    image: PRIDE,
    color: 'black',
  },
  {
    id: 3,
    name: 'APPLE PENCIL PRO',
    description: 'Engineering for limitless creativity',
    price: '$129',
    image: PENCIL,
    color: 'black',
  },
  {
    id: 4,
    name: 'APPLE WATCH SERIES 9',
    description: 'Smarter.Brighter.Mightier.',
    price: '$399',
    image: WATCH,
    color: 'black',
  },
  {
    id: 5,
    name: 'IPHONE 15 PRO',
    description: 'Titanium.',
    price: '$999',
    image: IPHONE,
    color: 'black',
  },
  {
    id: 6,
    name: 'MacBook AIR',
    description: 'Titanium.',
    price: '$999',
    image: MACBOOKAIR,
    color: 'white',
  },
  {
    id: 7,
    name: 'APPLE WATCH ULTRA 2',
    description: 'Titanium.',
    price: '$799',
    image: WATCHULTRA,
    color: 'white',
  },
  {
    id: 8,
    name: 'APPLE VISION PRO',
    description: 'Titanium.',
    price: '$1599',
    image: MACBOOKPRO,
    color: 'white',
  },
  {
    id: 9,
    name: 'AIRPODS MAX',
    description: 'Titanium.',
    price: '$549',
    image: AIRPODS,
    color: 'white',
  },
];
