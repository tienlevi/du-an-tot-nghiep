import { Category } from '@/types/category';
import instance from '@/config/axios';

export const getCategories = async () => {
  try {
    const response = await instance.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh mục sản phẩm:', error);
  }
};

export const getCategoryById = async (id: number | string) => {
  try {
    const response = await instance.get(`/categories/${id}`);
    return response.data;
    // console.log(response.data);
    
  } catch (error) {
    console.error('Lỗi khi lấy id danh mục:', error);
  }
};

export const addCategory = async (category: Category) => {
  try {
    const response = await instance.post('/categories', category);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa danh mục:', error);
  }
};

export const deleteCategory = async (id: number | string) => {
  try {
    const response = await instance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (id: number | string, category: Category) => {
  try {
    const response = await instance.put(`/categories/${id}`, category);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (id: any) => {
  try {
    const response = await instance.get(`/categories/${id}/products`);
    return response.data;    
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
  }
};
