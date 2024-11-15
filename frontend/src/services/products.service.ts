import { IAxiosResponse } from "@/types/AxiosResponse"
import { IProduct } from "@/types/ProductNew"
import instance from "@/utils/api/axiosIntance"

export const ProductServices = {
    async getProductBestSelling (){
        const data = await instance.get<IAxiosResponse<IProduct[]>>('/products/best-selling')
        return data.data
    },
    async getDetailProduct(id: string){
        const data =await instance.get<IAxiosResponse<IProduct>>(`/products/${id}`)
        return data.data
    }
}