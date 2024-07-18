import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { Category } from '../../types/category.types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ToastMessage from '../../components/ToastMessage';
import { useGetAllCategoriesQuery } from '../../service/productApi';
import { useCreateProductMutation } from '../../service/productApi';
import Button from '../../components/Button';

export const AddProducts: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productDiscount, setProductDiscount] = useState<number>(0);
  const [productImageURLs, setProductImageURLs] = useState<string[]>([]);
  const [productDescription, setProductDescription] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('You are not authenticated.');
          return;
        }
        if (!isLoading && data) {
          setCategories(data.data);
        } else {
          console.error('No categories found in response:', data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [data, isLoading]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You are not authenticated.');
        return;
      }

      const product = {
        name: productName,
        price: productPrice,
        category_name: selectedCategory,
        quantity: productQuantity,
        discount: productDiscount,
        image_url: productImageURLs,
        description: productDescription,
        expiry_date: expiryDate,
      };

      const response = await createProduct({ token, product });

      if (response.error) {
        const error = response.error;
        if ('status' in error && error.status === 400 && error.data) {
          const errorMessage = (error.data as { message: string }).message;

          if (
            errorMessage ===
            'Product already exists in your stock please!. Consider updating your stock levels.'
          ) {
            toast.error(() => (
              <ToastMessage
                message={errorMessage}
                onCancel={() => toast.dismiss()}
                onProceed={() => {
                  toast.dismiss();
                  clearFormFields();
                  navigate('/vendor/products');
                }}
              />
            ));
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error('Failed to create product');
        }
      } else if (response.data && response.data.success) {
        toast.success('Product created successfully');
        clearFormFields();
        navigate('/vendor/products');
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product');
    }
  };

  const clearFormFields = () => {
    setProductName('');
    setProductPrice('');
    setSelectedCategory('');
    setProductQuantity(0);
    setProductDiscount(0);
    setProductImageURLs([]);
    setProductDescription('');
    setExpiryDate(null);
  };

  useEffect(() => {
    if (user && user.role !== 'VENDOR') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <Input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <Input
              type="text"
              placeholder="Enter product price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category Name</label>
            {isLoading ? (
              <p>Loading categories...</p>
            ) : isError ? (
              <p>Error loading categories</p>
            ) : (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a category</option>
                {categories.map((category: Category, index: number) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={productQuantity.toString()}
              onChange={(e) => setProductQuantity(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Discount</label>
            <Input
              type="number"
              placeholder="Enter discount"
              value={productDiscount.toString()}
              onChange={(e) => setProductDiscount(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <DatePicker
              selected={expiryDate}
              onChange={(date) => setExpiryDate(date)}
              dateFormat="yyyy-MM-dd"
              className="shadow appearance-none border rounded w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholderText="Select expiry date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image URLs</label>
            {[...Array(8)].map((_, i) => (
              <Input
                key={i}
                type="text"
                placeholder={`Image URL ${i + 1}`}
                value={productImageURLs[i] || ''}
                onChange={(e) => {
                  const newImageURLs = [...productImageURLs];
                  newImageURLs[i] = e.target.value;
                  setProductImageURLs(newImageURLs);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <Button
            type="submit"
            title="Save changes"
            className="w-full"
            children={isCreating ? 'Saving changes...' : 'Save changes'}
          />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProducts;
