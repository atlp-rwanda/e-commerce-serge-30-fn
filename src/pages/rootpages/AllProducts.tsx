import ProductLoader from '../../components/rootcomponents/ProductLoader';

const AllProducts = () => {
  return (
    <div className="m-8">
      <h1>All Products</h1>
      <ProductLoader count={9} />
    </div>
  );
};

export default AllProducts;
