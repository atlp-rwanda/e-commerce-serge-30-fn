import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductImageMutation,
  useGetCategoriesQuery,
} from '../../service/productApi';
import { IProduct, ProductData, CategoriesDatas } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import { InputWithLabel } from './InputWithLabel';
import { TextareaInputWithLabel } from './TextareaInputWithLabel';
import { IconButton } from './IconButton';
import { FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import CustomButton from './CustomButton';

interface ProductFormProps {
  productId: string;
}

interface IProductFormValues extends Omit<IProduct, 'image_url' | 'Category'> {
  image_urls: string[];
  category_id: string;
  price: number;
  quantity: number;
  discount: number;
}

export const ProductUpdateForm: React.FC<ProductFormProps> = ({
  productId,
}) => {
  const { register, handleSubmit, setValue } = useForm<IProductFormValues>();
  const location = useLocation();
  const product = location.state as IProduct;

  const { isLoading: productLoading } = useGetProductQuery<ProductData>({
    token: localStorage.getItem('token') || '',
    productId,
  });
  const {
    data: categoriesData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useGetCategoriesQuery(localStorage.getItem('token') || '');

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProductImage] = useDeleteProductImageMutation();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setValue('name', product.name || '');
      setValue('description', product.description || '');
      setValue('price', product.price || 0);
      setValue('quantity', product.quantity || 0);
      setValue('discount', product.discount || 0);

      if (product.Category) {
        setValue('category_id', product.Category.category_id);
      }

      const formattedExpiryDate = new Date(product.expiry_date);
      if (!isNaN(formattedExpiryDate.getTime())) {
        setValue(
          'expiry_date',
          formattedExpiryDate.toISOString().substr(0, 10),
        );
      }

      if (product.image_url) {
        setImageUrls(product.image_url);
      }
    }
  }, [product, setValue]);

  const onSubmit: SubmitHandler<IProductFormValues> = (data) => {
    const formData = {
      name: data.name,
      description: data.description,
      price: data.price,
      category_name: '',
      expiry_date: data.expiry_date,
      image_url: imageUrls,
      quantity: data.quantity,
      discount: data.discount,
    };
    const selectCategory: CategoriesDatas = categoriesData as CategoriesDatas;
    const selectedCategory =
      selectCategory &&
      selectCategory?.data.find(
        (cat: { category_id: string }) => cat.category_id === data.category_id,
      );

    if (selectedCategory) {
      formData.category_name = selectedCategory.name;
    } else {
      console.error('Category name is missing.');
      return;
    }

    updateProduct({
      productId,
      UpdateProductFormData: formData,
      token: '',
    })
      .unwrap()
      .then((response) => {
        console.log('Product updated successfully:', response);
        toast.success('Product updated successfully');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        toast.error(`Error updating product: ${error.message}`);
      });
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleImageUrlChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = event.target.value;
    setImageUrls(newImageUrls);
  };

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      const response = await deleteProductImage({
        productId,
        imageUrl,
        token: '',
      }).unwrap();
      console.log('Image deleted successfully:', response);
      toast.success('Image deleted successfully');
      setImageUrls(imageUrls.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(`Error deleting image`);
    }
  };

  if (productLoading) {
    return <div>Loading...</div>;
  }

  if (categoryLoading) {
    if (categoryError) {
      return <div>Error fetching categories</div>;
    }
    return <div>Loading categories...</div>;
  }
  const catData: CategoriesDatas = categoriesData as CategoriesDatas;
  console.log(catData);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg m-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputWithLabel
            label="Name"
            register={register}
            name="name"
            type="text"
          />
          <TextareaInputWithLabel
            label="Description"
            register={register}
            name="description"
          />
          <InputWithLabel
            label="Price"
            register={register}
            name="price"
            type="number"
          />
          <InputWithLabel
            label="Quantity"
            register={register}
            name="quantity"
            type="number"
          />
          <InputWithLabel
            label="Discount"
            register={register}
            name="discount"
            type="number"
          />
          <InputWithLabel
            label="Expiry Date"
            register={register}
            name="expiry_date"
            type="date"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register('category_id')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
            >
              <option value="">Select Category</option>
              {catData &&
                catData?.data.map(
                  (category: { category_id: string; name: string }) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.name}
                    </option>
                  ),
                )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images / Videos
            </label>
            {imageUrls &&
              imageUrls.map((url: string, index: number) => {
                const isVideo = url.endsWith('.mp4');
                return (
                  <div key={index} className="relative inline-block">
                    {isVideo ? (
                      <video
                        src={url}
                        controls
                        className="h-20 w-20 object-cover rounded-lg shadow-md m-2"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-lg shadow-md m-2"
                      />
                    )}
                    <IconButton
                      text=""
                      colorClasses="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      IconComponent={FaTimes}
                      onClick={() => handleDeleteImage(url)}
                    />
                  </div>
                );
              })}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images / Videos URL
              </label>
              {imageUrls.map((url, index) => (
                <div key={index} className="relative mb-4">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1"
                  />
                </div>
              ))}
            </div>
            <CustomButton
              text="Add Image URL"
              colorClasses="mt-2 p-2 bg-blue-600 text-white rounded-md"
              IconComponent={FaPlus}
              onClick={handleAddImageUrl}
            />
          </div>
          <IconButton
            text="Update Product"
            colorClasses="w-full py-2 px-4 bg-green-500 text-white rounded-md shadow-sm"
            IconComponent={FaSave}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
