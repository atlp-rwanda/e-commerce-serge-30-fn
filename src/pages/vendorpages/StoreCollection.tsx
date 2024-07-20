import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input } from '../../components';
import { useCreateStoreMutation } from '../../service/productApi';

interface StoreFormData {
  storeName: string;
  storeDescription: string;
}

const StoreCollection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormData>();
  const [createStore, { isLoading, error }] = useCreateStoreMutation();

  const onSubmit: SubmitHandler<StoreFormData> = async (data) => {
    try {
      const response = await createStore({
        name: data.storeName,
        description: data.storeDescription,
      }).unwrap();
      console.log('Response', response);
    } catch (error) {
      console.error('Failed to create store:', error);
    }
    console.log(data);
  };

  let errorMessage;
  if (error) {
    errorMessage =
      'data' in error &&
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data
        ? (error.data as { message: string }).message
        : 'message' in error && typeof error.message === 'string'
          ? error.message
          : 'Unknown Error';
  }
  return (
    <div className="mt-10 flex justify-center flex-col items-center">
      <h1 className="mb-10">Create A Store For Your Products</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <div className="mb-4">
          <Input
            {...register('storeName', { required: true })}
            placeholder="Store Name"
            className1="border border-slate-300 w-full p-2"
          />
          {errors.storeName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <Input
            {...register('storeDescription', { required: true, minLength: 10 })}
            placeholder="Store Description"
            className1="border border-slate-300 w-full p-2"
          />
          {errors.storeDescription && (
            <span className="text-red-500">Minimum Length is 10</span>
          )}
        </div>
        <Button
          type="submit"
          title="Submit"
          className="text-white bg-blue-500 px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
        {error && <span className="text-red-500 mt-2">{errorMessage}</span>}
      </form>
    </div>
  );
};

export default StoreCollection;
