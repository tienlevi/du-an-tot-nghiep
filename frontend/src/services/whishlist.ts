import instance from '@/config/axios';

export const getWishlist = async () => {
  try {
    const response = await instance.get('/wishlist');
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách yêu thích:', error);
  }
};
