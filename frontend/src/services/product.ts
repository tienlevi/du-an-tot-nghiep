import instance from '@/config/axios';

export const getProducts = async () => {
  try {
    const response = await instance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy id sản phẩm:', error);
  }
};

export const addProduct = async (data: any) => {
  try {
    const response = await instance.post('/products', data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await instance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (id: string, data: any) => {
  try {
    const response = await instance.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};