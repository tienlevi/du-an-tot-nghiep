import { QUERY_KEY } from '@/constants/queryKey';
import { cartService } from '@/services/cart.service';
import { useTypedSelector } from '@/store/store';
import { useQuery } from '@tanstack/react-query';

const useGetMyCart = () => {
    const user = useTypedSelector((state) => state.auth.user);
    const { data, ...rest } = useQuery({
        queryKey: [QUERY_KEY.CART, user?._id],
        queryFn: async() => {
            const {data} = await cartService.getItemCart()
            return data
        },
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?._id,
    });
    const cartItem = useTypedSelector((state) => state.cartReducer.items);
    const responsePayloadCheckout = cartItem?.map((item: any) => ({
        productId: item.productVariation.productId._id,
        productVariationId: item.productVariation._id,
        name: item?.productVariation?.productId?.name,
        price: item?.productVariation?.price,
        image: item?.productVariation?.image,
        quantity: item.quantity,
        variants: item.productVariation.variantAttributes,
    }));
    return { data, ...rest, responsePayloadCheckout };
};

export default useGetMyCart;
