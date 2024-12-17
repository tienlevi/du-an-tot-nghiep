import { QUERY_KEY } from '@/constants/queryKey';
import myVoucherService from '@/services/my-voucher.service';
import { errorResponse } from '@/types/ErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutationUpdateVoucher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.MY_VOUCHER],
        mutationFn: (payload: { voucherId: string }) =>
            myVoucherService.updateVoucher(payload),
        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.MY_VOUCHER].includes(element as string),
                    ),
            });
        },
        onError: (error: errorResponse) => {
            // showMessage(error.response.data.message, 'error');
        },
    });
};
