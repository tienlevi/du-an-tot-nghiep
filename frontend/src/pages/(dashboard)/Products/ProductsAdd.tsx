import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import DefaultLayout from '../_components/Layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from '@/common/types/category';
import { addProduct, editProduct } from '@/services/product';
import { getCategories } from '@/services/category';
import { useEffect } from 'react';

interface Inputs {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  discount: number;
  countInStock: number;
  featured: boolean;
}

const ProductsAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response;
    },
  });
  const { mutate } = useMutation({
    mutationKey: ['products'],
    mutationFn: async (data: any) => {
      return await addProduct(data);
    },
    onSuccess: (data: any) => {
      if (data) {
        toast.success('thêm sản phẩm thành công');
        navigate('/products/list');
      } else {
        toast.error('Thêm sản phẩm thất bại');
      }
      return;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Thêm Sản Phẩm</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register('name')}
            placeholder="Tên Sản Phẩm"
            required
            className="w-full my-2 p-2 border border-gray-300 rounded"
          />
          <select
            {...register('category')}
            required
            className="w-full my-2 p-2 border border-gray-300 rounded"
          >
            <option value={``} className="text-gray-500">
              Danh mục
            </option>
            {categories?.data?.map((category: Category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            {...register('price')}
            placeholder="Giá"
            required
            className="w-full my-2 p-2 border border-gray-300 rounded"
          />

          {/* Thêm input cho việc upload ảnh */}
          <input
            type="text"
            {...register('image', { required: true })}
            className="w-full my-2 p-2 border border-gray-300 rounded"
          />
          {errors.image && (
            <span className="text-red-500">Vui lòng chọn ảnh</span>
          )}

          <textarea
            {...register('description')}
            placeholder="Mô Tả"
            className="w-full my-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            {...register('discount')}
            placeholder="Giảm Giá"
            className="w-full my-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            {...register('countInStock')}
            placeholder="Số lượng trong kho"
            className="w-full my-2 p-2 border border-gray-300 rounded"
          />
          <div className="flex my-2 items-center">
            <input type="checkbox" {...register('featured')} className="mr-2" />
            <span>Featured</span>
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Thêm Sản Phẩm
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default ProductsAdd;
