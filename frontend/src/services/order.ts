import instance from '@/config/axios';

export const createOrder = async (orderData: any) => {
  try {
    const response = await instance.post('/orders', orderData);
    return response;
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
  }
};

export const getOrderById = async (id: number | string) => {
  try {
    const response = await instance.get(`/orders/${id}`);
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin đơn hàng:', error);
  }
};

export const getUserOrders = async () => {
  try {
    const response = await instance.get('/orders/user');
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng của người dùng:', error);
  }
};

export const cancelOrder = async (id: number | string) => {
  try {
    const response = await instance.delete(`/orders/${id}`);
    return response;
  } catch (error) {
    console.error('Lỗi khi hủy đơn hàng:', error);
  }
};
