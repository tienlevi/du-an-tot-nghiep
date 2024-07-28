import instance from '@/config/axios';

export const getNotifications = async () => {
  try {
    const response = await instance.get('/notifications');
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy thông báo:', error);
  }
};

export const markAsRead = async (notificationId: number | string) => {
  try {
    const response = await instance.put(
      `/notifications/${notificationId}/read`,
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi đánh dấu thông báo đã đọc:', error);
  }
};

export const deleteNotification = async (notificationId: number | string) => {
  try {
    const response = await instance.delete(`/notifications/${notificationId}`);
    return response;
  } catch (error) {
    console.error('Lỗi khi xóa thông báo:', error);
  }
};
