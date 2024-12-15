import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import voucherService from '@/services/voucher.service';

const useGetDetailVoucher = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.VOUCHER, id],
        queryFn: async () => {
            const res = await voucherService.getDetail(id);
            return res.data;
        },
        enabled: !!id,
    });
};

export default useGetDetailVoucher;
