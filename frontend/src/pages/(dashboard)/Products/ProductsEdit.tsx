import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import DefaultLayout from '../_components/Layout/DefaultLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from '@/common/types/category';
import { editProduct, getProductById } from '@/services/product';
import { getCategories } from '@/services/category';
import UploadCloundinary from '@/common/utils/cloudinary';

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

const ProductsEdit = () => {
  const { id }: any = useParams();
  const element = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { data: product }: any = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response;
    },
  });
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
      const fileImage = element.current?.files?.[0];
      const image = await UploadCloundinary(fileImage);
      return await editProduct(id, { ...data, image: image.secure_url });
    },
    onSuccess: (data: any) => {
      if (data) {
        toast.success('Sửa sản phẩm thành công');
        navigate('/products/list');
      } else {
        toast.error('Sửa sản phẩm thất bại');
      }
      return;
    },
    onError: (error:any) => {
      toast.error(error.message || 'Có lỗi xảy ra khi sửa sản phẩm');
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  useEffect(() => {
    reset(product);
  }, [product]);

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Sửa sản Phẩm</h1>
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
            <option value="" className="text-gray-500">
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
          <p>Ảnh</p>
          <img src={product?.image} alt="" className="h-[450px]" />
          <input ref={element} type="file" className="w-full my-2 p-2" />
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
            Sửa Sản Phẩm
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default ProductsEdit;
