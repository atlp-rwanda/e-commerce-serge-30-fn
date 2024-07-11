import { useState } from 'react';
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaCalendarAlt,
  FaTags,
  FaEdit,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { IProduct } from '../../types';
import { ErrorPage } from '../../utils/ErrorPage';
import { ActionButton } from '../../components/vendorcomponents/ActionButton';
import * as vendorComponents from '../../components/index';

const ProductItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<string>(''); // Initialize with empty string

  if (!location.state) return <ErrorPage message="Product not found" />;

  const product: IProduct = location.state as IProduct;

  // Set initial selected image when component mounts
  if (!selectedImage && product.image_url.length > 0) {
    setSelectedImage(product.image_url[0]);
  }

  const handleUpdateClick = () => {
    navigate(`/vendor/products/${product.product_id}/update`, {
      state: product,
    });
  };
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <main className="h-screen grid md:flex gap-6 w-11/12 mx-auto py-12">
      {/* Images Sidebar */}
      <aside className="base-5 space-y-2">
        {/* Main Image */}
        <div className="relative">
          {/* Large Image Preview */}
          <img
            className="h-80 w-full object-cover cursor-pointer transition duration-300 transform hover:scale-105"
            src={selectedImage}
            alt="Product Preview"
            onClick={() => handleImageClick(product.image_url[0])}
          />
          {/* Overlay for Hover Effect */}
          <div
            onClick={() => handleImageClick(product.image_url[0])}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300"
          >
            <p className="text-white text-lg font-semibold">Click to View</p>
          </div>
        </div>

        {/* Thumbnail Images */}
        <section className="grid grid-cols-4 gap-2 mt-4">
          {product.image_url.map((imageUrl, index) => (
            <img
              key={index}
              className="w-32 h-32 cursor-pointer transform hover:scale-105 transition duration-300"
              src={imageUrl}
              alt={`Product Thumbnail ${index + 1}`}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </section>
      </aside>

      {/* Product Details */}
      <aside className="base-3 space-y-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaShoppingCart className="mr-2 text-gray-600" /> {product.name}
          </h1>
          <p className="text-md text-gray-500">{product.description}</p>
          <div>
            <p className="text-2xl font-bold text-green-600 flex items-center">
              <FaMoneyBillWave className="mr-2" /> ${product.price.toFixed(2)}
            </p>
            <p className="text-md text-gray-400 flex items-center">
              <FaShoppingCart className="mr-2" /> Stock: {product.quantity}
            </p>
          </div>
          <div>
            <p
              className={`text-md font-semibold ${product.discount > 0 ? 'text-red-500' : 'text-gray-400'} flex items-center`}
            >
              <FaTags className="mr-2" /> Discount: {product.discount}%
            </p>
            <p className="text-md text-gray-400 flex items-center">
              <FaCalendarAlt className="mr-2" /> Expiry Date:{' '}
              {new Date(product.expiry_date).toLocaleDateString()}
            </p>
            <p className="text-md text-gray-400 flex items-center">
              <FaCalendarAlt className="mr-2" /> Created Date:{' '}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-x-4">
            <ActionButton
              text="Update."
              colorClasses="bg-blue-600 px-6 py-2 hover:bg-blue-700 text-white"
              IconComponent={FaEdit}
              onClick={handleUpdateClick}
            />
            <vendorComponents.DeleteProduct
              product_id={product.product_id}
              iconOnly={false}
              customClasses="bg-red-300 px-3 rounded flex items-center transition duration-150 ease-in-out"
            />
          </div>
        </div>
      </aside>
    </main>
  );
};

export default ProductItem;
