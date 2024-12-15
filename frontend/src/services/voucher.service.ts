import { VOUCHER_ENDPOINT } from '@/constants/endpoint';
import { IAxiosResponse } from '@/types/AxiosResponse';
import { IVoucherResponse, IVoucher, IVoucherFormData } from '@/types/Voucher';
import instance from '@/utils/api/axiosIntance';
import { Params } from 'react-router-dom';

const voucherService = {
    async getAll(params: Params) {
        const res = await instance.get<IAxiosResponse<IVoucherResponse>>(
            `${VOUCHER_ENDPOINT.ALL}`,
            { params },
        );
        return res.data;
    },

    async createVoucher(payload: IVoucherFormData) {
        const res = await instance.post<IAxiosResponse<IVoucher>>(
            `${VOUCHER_ENDPOINT.CREATE}`,
            payload,
        );
        return res.data;
    },
    async updateVoucher(id: string, payload: Partial<IVoucherFormData>) {
        const res = await instance.patch<IAxiosResponse<IVoucher>>(
            `${VOUCHER_ENDPOINT.UPDATE}/${id}`,
            payload,
        );
        return res.data;
    },

    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<IVoucher>>(
            `${VOUCHER_ENDPOINT.DETAIL}/${id}`,
        );
        return res.data;
    },

    async deleteVoucher(id: string) {
        const res = await instance.delete<IAxiosResponse<IVoucher>>(
            `${VOUCHER_ENDPOINT.DELETE}/${id}`,
        );
        return res.data;
    },
};

export default voucherService;
