import instance from '@/config/axios';

export const getCart = async () => {
  try {
    const response = await instance.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
  }
};

export const addToCart = async (
  productId: number | string,
  quantity: number,
) => {
  try {
    const response = await instance.post('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
  }
};

export const updateCart = async (
  productId: number | string,
  quantity: number,
) => {
  try {
    const response = await instance.put('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật giỏ hàng:', error);
  }
};

export const removeFromCart = async (productId: number | string) => {
  try {
    const response = await instance.delete(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
  }
};
