import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '@/constants/queryKey';
import { ADMIN_ROUTES } from '@/constants/router';
import showMessage from '@/utils/ShowMessage';
import sizeService from '@/services/size.service';
import { IColorFormData } from '@/types/Color';
import { errorResponse } from '@/types/ErrorResponse';
import colorService from '@/services/color.service';

export const useMutationUpdateColor = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [QUERY_KEY.COLORS],
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: IColorFormData;
        }) => colorService.updateColor(id, payload),
        onSuccess: async () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.COLORS, QUERY_KEY.PRODUCTS].includes(
                            element as string,
                        ),
                    ),
            });
            showMessage('Đã cập nhật thông tin kích cỡ!', 'success');
            navigate(ADMIN_ROUTES.COLORS, { replace: true });
        },
        onError: (error: errorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};