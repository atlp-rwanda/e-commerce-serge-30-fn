import { IProduct } from '../../../types';
import StarIcon from '../StarIcon';
import { AddToCartButton } from '../AddToCartButton';

export function AllProducts({ products }: { products: IProduct[] }) {
  return (
    <div
      data-testid="noProducts"
      className="w-full h-screen flex flex-col gap-2 m-3"
    >
      {products.length === 0 ? (
        <h1 className="font-outfit text-6xl font-thin text-center">
          No Products found
        </h1>
      ) : (
        <div data-testid="container" className="flex flex-wrap gap-8">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="group bg-white drop-shadow-sm w-72 rounded-md transition-all ease-in-out overflow-hidden "
            >
              <div className="overflow-hidden">
                <img
                  src={product.image_url[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-100 "
                />
              </div>
              <div className="px-4 py-2">
                <h2 className="font-bold">{product.name}</h2>
                <h4 className="text-blue-900 font-medium py-2  transition-all ease-in-out group-hover:py-2">
                  save up to $ {product.discount}
                </h4>
                <div className="flex gap-2 items-center my-2 group-hover:hidden transition-all ease-in-out">
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      color="text-yellow-500"
                      size="w-4 h-4"
                    />
                  ))}
                  <span className="text-xs">({product.reviewsCount})</span>
                </div>
                <h2 className="font-bold py-2 group-hover:py-0">
                  ${product.price}
                </h2>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
