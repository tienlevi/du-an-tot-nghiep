import instance from '@/config/axios';

export const makePayment = async (paymentData: any) => {
  try {
    const response = await instance.post('/payments', paymentData);
    return response;
  } catch (error) {
    console.error('Lỗi khi thực hiện thanh toán:', error);
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await instance.get('/payments/history');
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử thanh toán:', error);
  }
};
