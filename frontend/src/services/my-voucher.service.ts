import { MY_VOUCHER_ENDPOINT } from '@/constants/endpoint';
import { IAxiosResponse } from '@/types/AxiosResponse';
import { MyVoucher } from '@/types/MyVoucher';
import instance from '@/utils/api/axiosIntance';

const myVoucherService = {
    async getAll() {
        const res = await instance.get<IAxiosResponse<Array<MyVoucher>>>(
            `${MY_VOUCHER_ENDPOINT.ALL}`,
        );
        return res.data;
    },

    async claimVoucher(payload: { voucherCode: string }) {
        const res = await instance.post<IAxiosResponse<any>>(
            `${MY_VOUCHER_ENDPOINT.CLAIM}`,
            payload,
        );
        return res.data;
    },

    async updateVoucher(payload: { voucherId: string }) {
        const res = await instance.post<IAxiosResponse<any>>(
            `${MY_VOUCHER_ENDPOINT.UPDATE}`,
            payload,
        );
        return res.data;
    },
};

export default myVoucherService;
