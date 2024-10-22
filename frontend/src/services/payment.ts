import instance from '@/config/axios';

export const Payment = async (amount: string | number) => {
  try {
    const response = await instance.post(`/payment?amount=${amount}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thực hiện thanh toán:', error);
  }
};
