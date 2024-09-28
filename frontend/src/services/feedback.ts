import instance from '@/config/axios';

export const addReview = async (
  productId: number | string,
  reviewData: any,
) => {
  try {
    const response = await instance.post(
      `/products/${productId}/reviews`,
      reviewData,
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm đánh giá:', error);
  }
};

export const getReviewsByProductId = async (productId: number | string) => {
  try {
    const response = await instance.get(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy đánh giá của sản phẩm:', error);
  }
};

export const deleteReview = async (
  productId: number | string,
  reviewId: number | string,
) => {
  try {
    const response = await instance.delete(
      `/products/${productId}/reviews/${reviewId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa đánh giá:', error);
  }
};
