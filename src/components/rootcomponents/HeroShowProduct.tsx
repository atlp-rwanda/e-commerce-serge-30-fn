import React, { useState, useEffect } from 'react';
import { products, ProductType } from '../../data/HeroProducts';
const getRandomProducts = (products: ProductType[]): ProductType[] => {
  const productCount = products.length;

  if (productCount < 2) {
    throw new Error('The products array must contain at least two items.');
  }

  const firstIndex = Math.floor(Math.random() * productCount);
  let secondIndex: number;
  do {
    secondIndex = Math.floor(Math.random() * productCount);
  } while (secondIndex === firstIndex);

  return [products[firstIndex], products[secondIndex]];
};

const HeroShowProduct: React.FC = () => {
  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const selectedProducts = getRandomProducts(products);
    setRandomProducts(selectedProducts);
  }, []);

  return (
    <>
      {randomProducts.map((product) => (
        <div
          key={product.id}
          className="bg-black text-white p-2 rounded-md w-64 h-80 m-2 max-tablet:hidden"
        >
          <p className="text-slate-100">{product.name}</p>
          <h4 className="pt-2">{product.description}</h4>
          <h4 className="text-slate-100">{product.price}</h4>
          <img
            src={product.image}
            alt={product.name}
            className="w-64 h-56 object-cover"
          />
        </div>
      ))}
    </>
  );
};

export default HeroShowProduct;
