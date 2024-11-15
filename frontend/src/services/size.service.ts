import instance from '@/utils/api/axiosIntance';

export const sizeServices = {
    async getAllSize() {
        const res = await instance.get(`/sizes/all`, {
            params: { limit: 10000, page: 1 },
        });
        return res.data;
    },
};
