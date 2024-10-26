import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import i18n from './components/common/components/LangConfig';
import WhiteButton from './components/common/components/WhiteButton';
import ActiveLastBreadcrumb from './components/common/components/Link';
import useAuth from '@/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCart,
  removeFromCart,
} from '@/services/cart';
import type { CartTypes } from '@/types/cart';
import { Product } from '@/types/product';
import { getProducts } from '@/services/product';

const Wishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: cart } = useQuery<CartTypes>({
    queryKey: ['cart', user?._id],
    queryFn: async () => {
      return await getCart(user?._id as string);
    },
  });
  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      return await getProducts();
    },
  });

  const cartItems = products?.filter((product) => {
    return cart?.products.some((item) => item.productId === product._id);
  });

  const carts = cartItems?.map((item) => {
    return {
      ...item,
      quantity: cart?.products.find((product) => product.productId === item._id)
        ?.quantity,
    };
  });

  const { mutate } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async (id: string) => {
      return await removeFromCart(id, user?._id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return (
    <div className="max-w-screen-lg mx-auto mt-48 flex flex-col gap-10">
      <ActiveLastBreadcrumb path="Home/Wishlist" />
      <div className="grid grid-cols-4 py-6 px-2 md:px-14 shadow rounded">
      <h2 className="text-base w-full">Image</h2>
      <h2 className="text-base w-full">Name</h2>
        <h2 className="text-base w-full">{i18n.t('cart.header.price')}</h2>
        <h2 className="text-base w-full">Thao Tác</h2>

      </div>
      {carts?.map((item: Product) => (
        <div
          key={item?._id}
          className="grid grid-cols-4 py-5 px-3 md:px-14 shadow rounded"
        >
          <div className="">
            <img
              loading="lazy"
              src={item?.image}
              alt={item?.name}
              className="w-1/2 h-full"
            />
          </div>
          <div className="flex items-center">
            <Link
              to={{ pathname: `/allProducts/${item?.name}` }}
              className="flex items-center"
            >
              <p className="ml-2 text-xs md:text-base ">{item?.name}</p>
            </Link>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500">${item?.price}</p>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => mutate(item._id!)}
          >
            Xóa Yêu Thích
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-2">
        <Link to="..">
          <WhiteButton name={'Return to shop'} onClick={() => { }} />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
