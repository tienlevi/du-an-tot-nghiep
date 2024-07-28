import instance from '@/config/axios';

export const signUp = async (userData: any) => {
  try {
    const response = await instance.post('/auth/signup', userData);
    return response;
  } catch (error) {
    console.error('Lỗi khi đăng ký người dùng:', error);
  }
};

export const login = async (credentials: any) => {
  try {
    const response = await instance.post('/auth/login', credentials);
    return response;
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
  }
};

export const logout = async () => {
  try {
    const response = await instance.post('/auth/logout');
    return response;
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error);
  }
};
