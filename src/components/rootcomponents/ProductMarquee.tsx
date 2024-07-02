import React from 'react';
import Marquee from 'react-fast-marquee';
import { productsMarquee } from '../../data/index';

const ProductMarquee: React.FC = () => {
  return (
    <Marquee pauseOnHover className="marquee">
      <div className="flex gap-8 mt-2 pl-2 max-tablet:mt-14">
        {productsMarquee.map((product) => (
          <div
            key={product.id}
            className={`bg-${product.color} text-white border border-black font-outfit p-2 w-96 rounded-md hover:scale-105`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-52 h-40 object-cover ml-24 "
            />
            <div className="flex justify-between items-center gap-2 p-1 border border-slate-300 rounded-full  w-3/4 bg-black">
              <p className="text-xs pl-2">{product.name}</p>
              <p className="bg-blue-600 rounded-full p-1 px-4">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Marquee>
  );
};

export default ProductMarquee;
