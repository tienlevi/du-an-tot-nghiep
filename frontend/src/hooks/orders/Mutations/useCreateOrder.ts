import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from '../../../utils/api/axiosIntance';
import { HTTP_METHOD } from '@/constants/http';
import { ORDER_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/queryKey';

type DataType = {
    items: {
        productId: string;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }[];
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    receiverInfo?: {
        name: string;
        email: string;
        phone: string;
    };
    description?: string;
    shippingAddress: {
        province: string;
        district: string;
        ward: string;
        address: string;
        provinceId: number;
        districtId: number;
        wardCode: string;
    };
    totalPrice: number;
    tax: number;
    coupon?: string;
    shippingFee: number;
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DataType) => {
            return await request<any>({
                method: HTTP_METHOD.POST,
                url: ORDER_ENDPOINT.CREATE_ORDER,
                data,
            });
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.ORDERS, QUERY_KEY.PRODUCTS].includes(
                            element as string,
                        ),
                    ),
            });
        },
    });
};
