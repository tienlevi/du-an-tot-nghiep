import instance from '@/config/axios';

// Tạo đơn hàng
export const createOrder = async (orderData: any) => {
  try {
    const response = await instance.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    throw new Error('Không thể tạo đơn hàng. Vui lòng thử lại sau.');
  }
};

// Lấy thông tin đơn hàng theo ID
export const getOrderById = async (id: number | string) => {
  try {
    const response = await instance.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    throw new Error('Không thể lấy thông tin đơn hàng. Vui lòng thử lại sau.');
  }
};

// Lấy danh sách đơn hàng của người dùng
export const getUserOrders = async (userId: number | string) => {
  try {
    const response = await instance.get(`/orders/user/${userId}`);
    console.log("Dữ liệu trả về từ API:", response.data); // Log dữ liệu trả về
    return response.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng của người dùng:', error);
    return [];
  }
};


// Hủy đơn hàng
export const cancelOrder = async (id: number | string) => {
  try {
    const response = await instance.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi hủy đơn hàng:', error);
    throw new Error('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
  }
};
