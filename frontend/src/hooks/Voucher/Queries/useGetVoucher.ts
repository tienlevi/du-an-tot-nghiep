import { QUERY_KEY } from '@/constants/queryKey';
import voucherService from '@/services/voucher.service';
import { Params } from '@/types/Api';
import { useQuery } from '@tanstack/react-query';

const useGetVoucher = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.VOUCHER, ...Object.values(params)],
        queryFn: () => voucherService.getAll(params),
    });
};

export default useGetVoucher;
