import { Product } from '@/types/product';
import instance from '@/config/axios';

export const getProducts = async () => {
  try {
    const response = await instance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};

export const getProductByLimit = async (limit?: string | number) => {
  try {
    const response = await instance.get(`/products/result?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};

export const getProductById = async (id: number | string) => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy id sản phẩm:', error);
  }
};

export const addProduct = async (product: any) => {
  try {
    const response = await instance.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
  }
};

export const deleteProduct = async (id: number | string) => {
  try {
    const response = await instance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (id: number | string, product: Product) => {
  try {
    const response = await instance.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
