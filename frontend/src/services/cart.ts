import instance from '@/config/axios';

export const getCart = async (userId: string) => {
  try {
    const response = await instance.get(`/carts/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
  }
};

export const addToCart = async (
  userId: string,
  products: { productId: string; product: object; quantity: number }[],
) => {
  try {
    const response = await instance.post('/carts/add-to-cart', {
      userId,
      products,
    });
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

export const removeFromCart = async (productId: string, userId: string) => {
  try {
    const response = await instance.post(
      `/carts/remove-cart/${productId}/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
  }
};
