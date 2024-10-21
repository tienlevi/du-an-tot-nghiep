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
export const getOrderById = async (userId: string, id: number | string) => {
  try {
    const response = await instance.get(`/orders/${userId}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    throw new Error('Không thể lấy thông tin đơn hàng. Vui lòng thử lại sau.');
  }
};

export const getOrderByUserId = async (userId: number | string) => {
  try {
    const response = await instance.get(`/orders/${userId}`);
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
    console.log('Dữ liệu trả về từ API:', response.data);
    return response.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng của người dùng:', error);
    return [];
  }
};

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  try {
    const response = await instance.get('/orders');
    console.log('Dữ liệu trả về từ API (Tất cả đơn hàng):', response.data);
    return response.data || [];
  } catch (error: any) {
    console.error('Lỗi khi lấy danh sách tất cả đơn hàng:', error);
    return [];
  }
};
// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (
  id: number | string,
  status: string,
) => {
  try {
    console.log(
      'Cập nhật trạng thái cho đơn hàng:',
      id,
      'với trạng thái:',
      status,
    ); // Log thông tin
    const response = await instance.put(`/orders/${id}/status`, { status });
    console.log('Kết quả cập nhật trạng thái:', response.data); // Log kết quả
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error); // Log lỗi
    throw new Error(
      'Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại sau.',
    );
  }
};
