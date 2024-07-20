import axios from 'axios';
import { useState, useEffect } from 'react';
import DefaultLayout from '../_components/Layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from '@/common/types/category';

const ProductsAdd = () => {
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    category: '',
    price: 0,
    image: '',
    gallery: '',
    description: '',
    discount: 0,
    countInStock: 0,
    featured: false,
    tags: '',
    attributes: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2202/api/v1/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const productData = {
        ...product,
        gallery: product.gallery.split(',').map((item: string) => item.trim()),
        tags: product.tags.split(',').map((item: string) => item.trim()),
        attributes: product.attributes
          .split(',')
          .map((item: string) => item.trim()),
      };

      productData.attributes = productData.attributes.map((attr: string) =>
        attr.replace(/['"\s]/g, ''),
      );

      const response = await axios.post(
        'http://localhost:2202/api/v1/products',
        productData,
      );
      console.log(response);
      setMessage('Product added successfully!');
      setProduct({
        name: '',
        slug: '',
        category: '',
        price: 0,
        image: '',
        gallery: '',
        description: '',
        discount: 0,
        countInStock: 0,
        featured: false,
        tags: '',
        attributes: '',
      });
      navigate('/products/list');
      toast.success('Thêm sản phẩm thành công');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Failed to add product: ${error.response?.data.message || error.message
          }`,
        );
      } else {
        setMessage('Failed to add product: An unexpected error occurred.');
      }
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Thêm Sản Phẩm</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
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
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="gallery"
            value={product.gallery}
            onChange={handleChange}
            placeholder="Gallery"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            placeholder="Discount"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="countInStock"
            value={product.countInStock}
            onChange={handleChange}
            placeholder="Count in Stock"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={product.featured}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Featured</span>
          </div>
          <input
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
          />
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
