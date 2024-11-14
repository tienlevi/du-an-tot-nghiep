import axios from 'axios';
import { getAccessToken, setAccessToken } from './apiHelper';
import queryString from 'query-string';
import { AUTH_ENDPOINT } from '~/constants/endpoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { Params } from '~/types/Api';

const axiosOptions = {
    baseURL: import.meta.env.VITE_REACT_API_URL,
    // headers: getContentType(),
    withCredentials: true,
    paramsSerializer: (params: Params) => queryString.stringify(params),
};
const instance = axios.create(axiosOptions);

instance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();

        if (config && config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            try {
                const { data } = await instance.post<IAxiosResponse<{ accessToken: string }>>(
                    `${AUTH_ENDPOINT.REFRESH}`
                );
                setAccessToken(data.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
                return instance.request(originalRequest);
            } catch (e) {
                console.log(e);
            }
        }
        throw error;
    }
);

export default instance;
