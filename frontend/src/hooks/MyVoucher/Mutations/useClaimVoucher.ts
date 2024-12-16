import { QUERY_KEY } from '@/constants/queryKey';
import myVoucherService from '@/services/my-voucher.service';
import { errorResponse } from '@/types/ErrorResponse';
import showMessage from '@/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutationClaimVoucher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.MY_VOUCHER],
        mutationFn: (payload: { voucherCode: string }) =>
            myVoucherService.claimVoucher(payload),

        onSuccess: async () => {
            showMessage('Claim voucher thành công!', 'success');
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.MY_VOUCHER].includes(element as string),
                    ),
            });
        },
        onError: (error: errorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
