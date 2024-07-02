import AIRPODS from '../../src/assets/airpods-max-select-silver-202011.jpeg';
import MACBOOKAIR from '../../src/assets/store-card-40-macbook-air-202402.jpeg';
import PRIDE from '../../src/assets/store-card-40-pride-202405.jpeg';
import MACBOOKPRO from '../../src/assets/store-card-40-vision-pro-202401.jpeg';
import WATCH from '../../src/assets/store-card-40-watch-s9-202309.jpeg';
import WATCHULTRA from '../../src/assets/store-card-40-watch-ultra-202309.jpeg';

interface ProductTypeShop {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  color?: string;
}

export const productsShop: ProductTypeShop[] = [
  {
    id: 2,
    name: 'BRAIDED SOLO LOOP',
    description: 'Let your light shine',
    price: '$99',
    image: PRIDE,
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
