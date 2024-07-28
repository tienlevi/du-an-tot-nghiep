import instance from '@/config/axios';

export const getUserProfile = async () => {
  try {
    const response = await instance.get('/user/profile');
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin hồ sơ người dùng:', error);
  }
};

export const updateUserProfile = async (profileData: any) => {
  try {
    const response = await instance.put('/user/profile', profileData);
    return response;
  } catch (error) {
    console.error('Lỗi khi cập nhật hồ sơ người dùng:', error);
  }
};

export const getUserAddresses = async () => {
  try {
    const response = await instance.get('/user/addresses');
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa chỉ:', error);
  }
};

export const addUserAddress = async (addressData: any) => {
  try {
    const response = await instance.post('/user/addresses', addressData);
    return response;
  } catch (error) {
    console.error('Lỗi khi thêm địa chỉ:', error);
  }
};

export const updateUserAddress = async (
  id: number | string,
  addressData: any,
) => {
  try {
    const response = await instance.put(`/user/addresses/${id}`, addressData);
    return response;
  } catch (error) {
    console.error('Lỗi khi cập nhật địa chỉ:', error);
  }
};

export const deleteUserAddress = async (id: number | string) => {
  try {
    const response = await instance.delete(`/user/addresses/${id}`);
    return response;
  } catch (error) {
    console.error('Lỗi khi xóa địa chỉ:', error);
  }
};
