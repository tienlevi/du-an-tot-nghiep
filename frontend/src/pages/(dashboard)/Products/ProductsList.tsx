import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/common/types/product';
import { Category } from '@/common/types/category';
import { toast } from 'react-toastify';
import DefaultLayout from '../_components/Layout/DefaultLayout';
import { getProducts } from '@/services/product';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:2202/api/v1/categories');
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (productId: string) => {
    const confirm = window.confirm('BẠN CÓ CHẮC CHẮN XÓA KHÔNG ?');
    if (confirm) {
      try {
        const response = await fetch(
          `http://localhost:2202/api/v1/products/${productId}`,
          {
            method: 'DELETE',
          },
        );

        if (response.ok) {
          setProducts(products.filter((product) => product._id !== productId));
          toast.error('Xóa sản phẩm thành công');
        } else {
          console.error('Lỗi khi xóa sản phẩm:', await response.json());
          alert('LỖI KHI XÓA SẢN PHẨM');
        }
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories?.find((cat: any) => cat._id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Danh sách sản phẩm</h2>
        <Link
          to={'/products/add'}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Thêm Sản Phẩm
        </Link>
        <br />
        <br />
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-3 text-left">Tên</th>
                <th className="p-3 text-left">Danh mục</th>
                <th className="p-3 text-left">Giá</th>
                <th className="p-3 text-left">Mô tả</th>
                <th className="p-3 text-left">Giảm giá</th>
                <th className="p-3 text-left">Số lượng trong kho</th>
                <th className="p-3 text-left">Sản phẩm nổi bật</th>
                <th className="p-3 text-left">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  onDelete={handleDelete}
                  getCategoryName={getCategoryName}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

const ProductItem: React.FC<{
  product: Product;
  onDelete: (id: string) => void;
  getCategoryName: (categoryId: string) => string;
}> = ({ product, onDelete, getCategoryName }) => (
  <tr className="border-b border-gray-300">
    <td className="p-3">{product.name}</td>
    <td className="p-3">{getCategoryName(product.category)}</td>
    <td className="p-3">{product.price}</td>
    <td className="p-3">{product.description}</td>
    <td className="p-3">{product.discount}</td>
    <td className="p-3">{product.countInStock}</td>
    <td className="p-3">{product.featured ? 'Có' : 'Không'}</td>
    <td className="p-3 flex justify-between">
      <Link
        to={`/products/edit/${product._id}`}
        className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-1"
      >
        Edit
      </Link>
      <button
        onClick={() => onDelete(product._id)}
        className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 ml-1"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default ProductsList;
