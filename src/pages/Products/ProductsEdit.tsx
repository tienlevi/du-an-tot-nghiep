import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

const ProductsEdit = () => {
  const { id } = useParams();
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
  const navigate = useNavigate()

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:2202/api/v1/products/${id}`);
        const fetchedProduct = response.data;
        setProduct({
          ...fetchedProduct,
          gallery: fetchedProduct.gallery.join(', '),
          tags: fetchedProduct.tags.join(', '),
          attributes: fetchedProduct.attributes.join(', '),
        });
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setMessage('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target;
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...product,
        gallery: product.gallery.split(',').map((item) => item.trim()),
        tags: product.tags.split(',').map((item) => item.trim()),
        attributes: product.attributes.split(',').map((item) => item.trim()),
      };

      // Ensure attributes are valid ObjectId strings
      productData.attributes = productData.attributes.map((attr) => attr.replace(/['"\s]/g, ''));

      await axios.put(`http://localhost:2202/api/v1/products/${id}`, productData);
      setMessage('Product updated successfully!');
      navigate('/products/productslist');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(`Failed to update product: ${error.response?.data.message || error.message}`);
      } else {
        setMessage('Failed to update product: An unexpected error occurred.');
      }
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Chỉnh Sửa Sản Phẩm</h1>
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
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
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
            Update Product
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </DefaultLayout>
  );
};

export default ProductsEdit;
