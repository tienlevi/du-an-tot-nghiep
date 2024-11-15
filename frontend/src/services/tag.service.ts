import instance from '@/utils/api/axiosIntance';

export const tagServices = {
    async getAllTag() {
        const res = await instance.get(`/tags/`, {
            params: { limit: 10000, page: 1 },
        });
        return res.data;
    },
};
