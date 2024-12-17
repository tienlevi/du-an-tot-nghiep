import { MAIN_ROUTES } from '@/constants/router';
import { useMutationUpdateVoucher } from '@/hooks/MyVoucher/Mutations/useUpdateVoucher';
import UseVNPayReturn from '@/hooks/orders/Queries/useVnPayReturn';
import { calculateOrderHasVoucher } from '@/store/slice/cartSlice';
import { useAppDispatch, useTypedSelector } from '@/store/store';
import { Button, Result, Watermark } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const isSuccess = params.get('vnp_ResponseCode') == '00';
    const isVnPay = params.get('vnp_SecureHash');

    const dispatch = useAppDispatch();

    const voucher = useTypedSelector((state) => state.cartReducer.voucher);

    const { mutate: updateMyVoucher } = useMutationUpdateVoucher();

    UseVNPayReturn(params, Boolean(isVnPay));

    if (!isSuccess) {
        navigate(MAIN_ROUTES.ERROR_ORDER);
        return null;
    }

    useEffect(() => {
        if (voucher?._id && isSuccess) {
            updateMyVoucher(
                { voucherId: voucher?._id },
                {
                    onSuccess: () => {
                        dispatch(
                            calculateOrderHasVoucher({
                                voucher: undefined,
                                totalAmount: 0,
                            }),
                        );
                    },
                },
            );
        }
    }, [voucher?._id, isSuccess]);

    return (
        <Watermark content={['ADSTORE', 'Thank you!']}>
            <div className="h-[100vh]" />
            <Result
                status="success"
                title="Đơn đặt hàng của bạn đã gửi thành công!"
                subTitle="Bạn sẽ nhận được thông báo xác nhận qua email của chúng tôi."
                className="fixed left-[50%] top-[50%] z-99999 -translate-x-[50%] -translate-y-[50%] rounded-md border border-transparent bg-gray-3 bg-opacity-65 p-10"
                extra={[
                    <Button
                        onClick={() => {
                            navigate(MAIN_ROUTES.MY_ORDERS, { replace: true });
                        }}
                        type="primary"
                        key="home"
                    >
                        Kiểm tra trạng thái
                    </Button>,
                    <Button
                        key="my-order"
                        onClick={() => {
                            navigate('/', { replace: true });
                        }}
                    >
                        Trang chủ
                    </Button>,
                ]}
            />
        </Watermark>
    );
}
