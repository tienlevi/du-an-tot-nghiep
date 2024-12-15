import { QUERY_KEY } from '@/constants/queryKey';
import { ADMIN_ROUTES } from '@/constants/router';
import voucherService from '@/services/voucher.service';
import { errorResponse } from '@/types/ErrorResponse';
import { IVoucherFormData } from '@/types/Voucher';
import showMessage from '@/utils/ShowMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useMutationCreateVoucher = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.VOUCHER],
        mutationFn: (payload: IVoucherFormData) =>
            voucherService.createVoucher(payload),

        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.VOUCHER].includes(element as string),
                    ),
            });
            showMessage('Tạo mới voucher thành công!', 'success');
            navigate(ADMIN_ROUTES.VOUCHER, { replace: true });
        },
        onError: (error: errorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
