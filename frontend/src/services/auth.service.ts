import instance from '@/config/axios';
import { IAxiosResponse } from '@/types/AxiosResponse';
import { ILoginResponse } from '@/types/user';
import { LoginFormData, RegisterFormData } from '@/validation/Auth/Auth';
import { AxiosResponse } from 'axios';

const AuthServices = {
    async login(body: LoginFormData) {
        const data = await instance.post('/auth/login', body);
        return data.data;
    },
    async register(body: RegisterFormData) {
        const data = await instance.post<
            RegisterFormData,
            AxiosResponse<ILoginResponse>
        >('/auth/register', body);
        return data.data;
    },
    async sendResetPassword(body: { email: string }) {
        return instance.post<IAxiosResponse<null>>(
            `/auth/sendresetPassword`,
            body,
        );
    },
    async doLogout() {
        return instance.post(`/logout`);
    },
};

export default AuthServices;
