import { editCategory, getCategoryById } from '@/services/category';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultLayout from './_components/Layout/DefaultLayout';
import UploadCloundinary from '@/utils/cloudinary';

interface Inputs {
  name: string;
  image?: string;
}

const CategoryEdit = () => {
  const { id }: any = useParams();
  const element = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const { data: category }: any = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await getCategoryById(id);
      return response;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ['categories'],
    mutationFn: async (data: Inputs) => {
      const fileImage = element.current?.files?.[0];
      let imageUrl = category?.image; // Sử dụng ảnh hiện tại nếu không có ảnh mới

      if (fileImage) {
        const image = await UploadCloundinary(fileImage);
        imageUrl = image.secure_url;
      }

      return await editCategory(id, { ...data, image: imageUrl });
    },
    onSuccess: (data: any) => {
      if (data) {
        toast.success('Sửa danh mục thành công');
        navigate('/category/list');
      } else {
        toast.error('Sửa danh mục thất bại');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Có lỗi xảy ra khi sửa danh mục');
    },
  });

  const onSubmit = (data: Inputs) => {
    mutate(data);
  };

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);
  console.log(category, 'i');

  return (
    <DefaultLayout>
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Sửa Danh Mục</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            defaultValue={category?.category?.name}
            {...register('name', { required: 'Vui lòng nhập tên danh mục!' })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="w-full p-2 border border-gray-300 rounded">
            <p>Ảnh</p>
            <img src={category?.category?.image} alt="" className="" />
            <input ref={element} type="file" className="w-full my-2 p-2"
              {...register('image', { required: 'Vui lòng chọn ảnh ' })}

            />
            {errors.image && (
              <span className="text-red-500 ">{errors.image.message}</span>
            )} <br />


          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sửa Danh Mục
          </button>
          <br />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CategoryEdit;
