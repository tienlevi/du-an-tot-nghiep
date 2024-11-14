import AuthServices from "@/services/auth.service"
import { RegisterFormData } from "@/validation/Auth/Auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

export const useAuthRegister = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['REGISTER'],
        mutationFn: (body: RegisterFormData)=>{
            return AuthServices.register(body)
        },
        onSuccess: ()=>{
            toast.success('Đăng ký thành công.')
            navigate('/login')
        },
        onError: (error: any)=>{
            toast.error(`${error.response.data.message}`)
        }
    })
}