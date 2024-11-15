import instance from '@/utils/api/axiosIntance';

export const colorServices = {
    async getAllColor() {
        const res = await instance.get(`/colors/all`, {
            params: { limit: 10000, page: 1 },
        });
        return res.data;
    },
};
