import { QUERY_KEY } from '@/constants/queryKey';
import myVoucherService from '@/services/my-voucher.service';
import { useMutation } from '@tanstack/react-query';

export const useMutationUpdateVoucher = () => {
    return useMutation({
        mutationKey: [QUERY_KEY.MY_VOUCHER],
        mutationFn: (payload: { voucherId: string }) =>
            myVoucherService.updateVoucher(payload),
        onSuccess: async () => {},
        onError: () => {},
    });
};
