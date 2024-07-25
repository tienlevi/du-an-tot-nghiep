import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DefaultLayout from '../_components/Layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from '@/common/types/category';
import { Product } from '@/common/types/product';
import { addProduct } from '@/services/product';

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:2202/api/v1/categories',
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await addProduct(data);
      toast.success('Thêm sản phẩm thành công');
      navigate('/products/list');

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Thêm Sản Phẩm</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register('name')}
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/* <input
            type="text"
            name="slug"
            
            placeholder="Slug"
            className="w-full p-2 border border-gray-300 rounded"
          /> */}
          <select
            {...register('category')}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled className="text-gray-500">
              Danh mục
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            {...register('price')}
            placeholder="Price"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            {...register('image')}
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/* <input
            type="text"
            name="gallery"
            value={product.gallery}
            onChange={handleChange}
            placeholder="Gallery"
            className="w-full p-2 border border-gray-300 rounded"
          /> */}
          <textarea
            {...register('description')}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            {...register('discount')}
            placeholder="Discount"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            {...register('countInStock')}
            placeholder="Count in Stock"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex items-center">
            <input type="checkbox" {...register('featured')} className="mr-2" />
            <span>Featured</span>
          </div>
          {/* <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Tags"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="attributes"
            value={product.attributes}
            onChange={handleChange}
            placeholder="Attributes"
            className="w-full p-2 border border-gray-300 rounded"
          /> */}
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Add Product
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </DefaultLayout>
  );
};

export default ProductsAdd;
