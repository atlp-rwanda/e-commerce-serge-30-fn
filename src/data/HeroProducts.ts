import IPADPRO from '../../src/assets/store-card-40-ipad-pro-202405.jpeg';
import PRIDE from '../../src/assets/store-card-40-pride-202405.jpeg';
import IPHONE from '../../src/assets/store-card-40-iphone-15-pro-202309.jpeg';
import PENCIL from '../../src/assets/store-card-40-apple-pencil-202405.png';
import WATCH from '../../src/assets/store-card-40-watch-s9-202309.jpeg';
export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const products: ProductType[] = [
  {
    id: 1,
    name: 'IPAD PRO',
    description: 'ThinPossible',
    price: '$999',
    image: IPADPRO,
  },
  {
    id: 2,
    name: 'BRAIDED SOLO LOOP',
    description: 'Let your light shine',
    price: '$99',
    image: PRIDE,
  },
  {
    id: 3,
    name: 'APPLE PENCIL PRO',
    description: 'Engineering for limitless creativity',
    price: '$129',
    image: PENCIL,
  },
  {
    id: 4,
    name: 'APPLE WATCH SERIES 9',
    description: 'Smarter.Brighter.Mightier.',
    price: '$399',
    image: WATCH,
  },
  {
    id: 5,
    name: 'IPHONE 15 PRO',
    description: 'Titanium.',
    price: '$999',
    image: IPHONE,
  },
];
