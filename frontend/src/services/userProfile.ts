import instance from '@/config/axios';

export const getUserProfile = async () => {
  try {
    const response = await instance.get('/user/profile');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin hồ sơ người dùng:', error);
  }
};

export const deleteUserProfile = async (id: number | string) => {
  try {
    const response = await instance.delete(`/user/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa hồ sơ người dùng:', error);
  }
};

export const updateUserProfile = async (profileData: any) => {
  try {
    const response = await instance.put('/user/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật hồ sơ người dùng:', error);
  }
};

export const getUserAddresses = async () => {
  try {
    const response = await instance.get('/user/addresses');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa chỉ:', error);
  }
};

export const addUserAddress = async (addressData: any) => {
  try {
    const response = await instance.post('/user/addresses', addressData);
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật địa chỉ:', error);
  }
};

export const deleteUserAddress = async (id: number | string) => {
  try {
    const response = await instance.delete(`/user/addresses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa địa chỉ:', error);
  }
};

// Khóa tài khoản người dùng
export const lockUserAccount = async (id: number | string) => {
  try {
    // Send a PUT request to update `isLocked` to true
    const response = await instance.put(`/user/profile/${id}`, {
      isLocked: true,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi khóa tài khoản người dùng:', error);
    throw error;
  }
};

// Mở khóa tài khoản người dùng
export const unLockUserAccount = async (id: number | string) => {
  try {
    // Send a PUT request to update `isLocked` to false
    const response = await instance.put(`/user/profile/${id}`, {
      isLocked: false,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi mở khóa tài khoản người dùng:', error);
    throw error;
  }
};
