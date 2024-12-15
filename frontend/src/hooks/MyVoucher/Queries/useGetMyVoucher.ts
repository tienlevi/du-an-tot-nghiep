import { QUERY_KEY } from '@/constants/queryKey';
import myVoucherService from '@/services/my-voucher.service';
import { useQuery } from '@tanstack/react-query';

const useGetMyVoucher = () => {
    return useQuery({
        queryKey: [QUERY_KEY.MY_VOUCHER],
        queryFn: () => myVoucherService.getAll(),
    });
};

export default useGetMyVoucher;
