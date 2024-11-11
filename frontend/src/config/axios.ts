import axios from 'axios';

const axiosOptions = {
  baseURL: import.meta.env.VITE_REACT_API_URL,
};

const instance = axios.create(axiosOptions);

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (config && config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance