import { Params } from '@/types/Api';
import { IAxiosResponse } from '@/types/AxiosResponse';
import { IProduct, IProductResponse } from '@/types/ProductNew';

import instance from '@/utils/api/axiosIntance';
export type IAllProductResponseNew = {
    products: IProduct[];
    page: number;
    totalDocs: number;
    totalPages: number;
};
export const ProductServices = {
    async getProductBestSelling() {
        const data = await instance.get<IAxiosResponse<IProduct[]>>(
            '/products/best-selling',
        );
        return data.data;
    },
    async getAllProducts(params: Params) {
        const data = await instance.get<IAxiosResponse<IProductResponse>>(
            '/products/all',
            {
                params,
            },
        );
        return data.data;
    },
    async getDetailProduct(id: string) {
        const data = await instance.get<IAxiosResponse<IProduct>>(
            `/products/${id}`,
        );
        return data.data;
    },
    async createProduct(data: FormData) {
        const res = await instance.post<IAxiosResponse<null>>(
            `/products/create`,
            data,
        );
        return res.data;
    },
    async updateProduct(data: FormData, id: string) {
        const res = await instance.put<IAxiosResponse<null>>(
            `/products/update/${id}`,
            data,
        );
        return res.data;
    },
    async getAll(params: any) {
        const res = await instance.get<IAxiosResponse<IAllProductResponseNew>>(
            `/products/all`,
            { params },
        );
        return res.data;
    },
};
