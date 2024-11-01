import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from '@/types/category';
import { editProduct, getProductById } from '@/services/product';
import { getCategories } from '@/services/category';
import UploadCloundinary from '@/utils/cloudinary';
import DefaultLayout from './_components/Layout/DefaultLayout';
import { Product } from '@/types/product';
import { IoMdClose } from 'react-icons/io';
import usePreview from '@/hooks/usePreview';

interface Inputs {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  discount: number;
  countInStock: number;
  featured: boolean;
  size: string;
}

const sizes = ['S', 'M', 'L', 'XL', '2XL'];

const ProductsEdit = () => {
  const { id }: any = useParams();
  const element = useRef<HTMLInputElement>(null);
  const elementColor = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const imageFile = usePreview();
  const imageFileColor = usePreview();
  const [tagName, setTagName] = useState<string>('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const checkbox = register('size');
  const { data: product } = useQuery<Product>({
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
    onError: (error: any) => {
      toast.error(error.message || 'Có lỗi xảy ra khi sửa sản phẩm');
    },
  });

  useEffect(() => {
    reset(product);
  }, [product]);

  const addTag = async (data: any) => {
    const fileImageColor = elementColor.current?.files?.[0];
    const image = await UploadCloundinary(fileImageColor);
    const newTag = { name: tagName, image: image?.secure_url };
    setTags([...tags, newTag] as any);
    console.log(tags);
  };

  const removeTag = (id: number) => {
    const remove = tags.filter((_, index) => index + 1 !== id);
    setTags(remove);
  };

  const currentTags = [...(product?.attributes?.color || []), ...tags];

  const onSubmit = (data: any) => {
    mutate({ ...data, attributes: { size: data.size, color: currentTags } });
  };

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
            {categories?.data?.map((category: Category) =>
              category._id === product?.category ? (
                <option key={category._id} value={category._id} selected>
                  {category.name}
                </option>
              ) : (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ),
            )}
          </select>

          <input
            type="number"
            {...register('price')}
            placeholder="Giá"
            required
            className="w-full my-2 p-2 border border-gray-300 rounded"
          />

          {/* Thêm input cho việc upload ảnh */}
          <div className="w-full p-2 border border-gray-300 rounded">
            <p>Ảnh</p>
            <img src={product?.image} alt="" className="" />
            <input ref={element} type="file" className="w-full my-2 p-2" />
          </div>
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
          <div className="flex flex-col my-2 items-start">
            <span className="mb-2">Size</span>
            <div className="flex items-center">
              {sizes?.map((size) => {
                const isChecked = product?.attributes?.size?.includes(size);
                return (
                  <div key={size} className="flex items-center mr-2">
                    <input
                      type="checkbox"
                      value={size}
                      {...register('size')}
                      className="mr-2"
                      defaultChecked={isChecked}
                    />
                    <span>{size}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label htmlFor="">Màu sắc</label>
            <div className="grid grid-cols-5 gap-2 w-full my-2 p-2 border border-gray-300 rounded">
              {currentTags?.map((item: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-blue-500 text-white py-2 rounded"
                  onClick={() => removeTag(index + 1)}
                >
                  <p>{item.name}</p>
                  <IoMdClose
                    style={{
                      color: 'white',
                      marginLeft: 5,
                      cursor: 'pointer',
                    }}
                  />
                </div>
              ))}
            </div>
            <label htmlFor="">Tên màu sắc</label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Tên Màu sắc"
              className="w-full my-2 p-2 border border-gray-300 rounded"
            />
            <p>Ảnh Màu sắc</p>
            <input
              ref={elementColor}
              type="file"
              onChange={imageFileColor.handleChangeFile}
              className="w-full my-2 p-2"
            />
            <div
              onClick={addTag}
              className="bg-red-500 w-[145px] text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
            >
              Thêm Màu sắc
            </div>
          </div>
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
