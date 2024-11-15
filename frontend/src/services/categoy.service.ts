import { CATEGORY_ENDPOINT } from '@/constants/endpoint';
import instance from '@/utils/api/axiosIntance';

export const cateServices = {
    async getALLCate() {
        const res = await instance.get(`${CATEGORY_ENDPOINT.ALL}`, {
            params: { limit: 10000, page: 1 },
        });
        return res.data;
    },
};
