import instance from "@/config/axios";
import { ILoginResponse } from "@/types/user";
import { LoginFormData, RegisterFormData } from "@/validation/Auth/Auth";
import { AxiosResponse } from "axios";

const AuthServices = {
    async login(body: LoginFormData){
        const data = await instance.post('/auth/login', body)
        return data.data
    },
    async register(body: RegisterFormData){
        const data = await instance.post<RegisterFormData, AxiosResponse<ILoginResponse>>('/auth/register', body)
        return data.data
    }
}

export default AuthServices