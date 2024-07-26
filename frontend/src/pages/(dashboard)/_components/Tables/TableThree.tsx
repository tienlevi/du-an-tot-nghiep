import { Category } from '@/common/types/category';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TableThree: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:2202/api/v1/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        cache: 'no-cache',
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      } else {
        console.error('Lỗi khi lấy danh sách danh mục:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
    }
  };

  const handleAddCategory = async () => {
    const newName = prompt('Nhập tên danh mục mới:');
    const newSlug = prompt('Nhập slug cho danh mục mới:');
    if (newName && newSlug) {
      try {
        const response = await fetch('http://localhost:2202/api/v1/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName, slug: newSlug }),
        });

        const responseData = await response.json();

        if (response.ok) {
          setCategories([...categories, responseData]);
          console.log(responseData);

          toast.success('Thêm danh mục thành công');
        } else {
          console.error('Lỗi khi thêm danh mục:', responseData);
          alert('Lỗi khi thêm danh mục');
        }
      } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
        alert('Lỗi khi thêm danh mục');
      }
    }
  };


  const handleEditCategory = async (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    const currentName = category ? category.name : '';
    const currentSlug = category ? category.slug : '';

    const newName = prompt('Nhập tên mới cho danh mục:', currentName);
    const newSlug = prompt('Nhập slug mới cho danh mục:', currentSlug);
    if (newName && newSlug && (newName !== currentName || newSlug !== currentSlug)) {
      try {
        const response = await fetch(
          `http://localhost:2202/api/v1/categories/${categoryId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName, slug: newSlug }),
          },
        );

        const responseData = await response.json();

        if (response.ok) {
          setCategories(categories.map((category) =>
            category._id === categoryId ? { ...category, name: newName, slug: newSlug } : category
          ));
          toast.success('Sửa danh mục thành công');
        } else {
          console.error('Lỗi khi sửa danh mục:', responseData);
          alert('Lỗi rồi');
        }
      } catch (error) {
        console.error('Lỗi khi sửa danh mục:', error);
      }
    }
  };


  const handleDeleteCategory = async (categoryId: string) => {
    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
      try {
        const response = await fetch(
          `http://localhost:2202/api/v1/categories/${categoryId}`,
          {
            method: 'DELETE',
          },
        );

        const responseData = await response.json();

        if (response.ok) {
          setCategories(categories.filter((category) => category._id !== categoryId));
          toast.success('Xóa danh mục thành công');
        } else {
          console.error('Lỗi khi xóa danh mục:', responseData);
          alert('Lỗi rồi');
        }
      } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <button onClick={handleAddCategory} className="bg-blue-500 mb-2 text-white px-4 py-2 rounded-md">
        Thêm danh mục
      </button>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[10px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                STT
              </th>
              <th className="min-w-[130px] py-4 font-medium text-black dark:text-white">
                Tên danh mục
              </th>
              <th className="min-w-[130px] py-4 font-medium text-black dark:text-white">
                Mô tả
              </th>
              <th className="py-4 font-medium text-black dark:text-white">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{category?.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{category?.slug}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark mr-10">
                    <button
                      onClick={() => handleEditCategory(category._id)}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded block md:inline-block w-full md:w-auto"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded block md:inline-block w-full md:w-auto"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-5">
                  Không có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default TableThree;
