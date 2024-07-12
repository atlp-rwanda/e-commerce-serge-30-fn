import { Button } from './Button';
import ShopProduct from './ShopProduct';
import { useNavigate } from 'react-router-dom';
const ProductList = () => {
  const navigate = useNavigate();
  const handleAllProducts = () => {
    navigate('/shop');
  };
  return (
    <div className="bg-[#fafafa] px-8">
      <div className="bg-[FAFAFA] my-12 font-outfit">
        <h1 className="text-6xl font-bold max-tablet:text-4xl">
          Shop all latest offers and innovations
        </h1>
        <div className="my-10">
          <ShopProduct />
        </div>
        <div className="flex justify-center items-center  my-4  ">
          <Button
            children="View All Products"
            className=" bg-black text-white py-2 px-6 rounded-sm  "
            onClick={handleAllProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
