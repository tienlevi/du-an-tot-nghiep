import { CART_ENDPOINT } from '@/constants/endpoint';
import instance from '@/utils/api/axiosIntance';

export const cartService = {
    async getItemCart() {
        const res = await instance.get(`${CART_ENDPOINT.GET}/my-cart`);
        return res.data;
    },
    async addToCart(body: any) {
        const res = await instance.post(`${CART_ENDPOINT.ADDCART}`, body);
        return res.data;
    },
    async updateQuantity(body: any) {
        const res = await instance.post(`${CART_ENDPOINT.UPDATEQUANTITY}`, body);
        return res.data;
    },
    async removeCart(id: string) {
        const res = await instance.patch(`${CART_ENDPOINT.REMOVEITEM}/${id}`);
        return res.data;
    },
    async removeAllCart(body: { userId: string }) {
        await instance.patch(`${CART_ENDPOINT.GET}/removeAll`, body);
    },
};
