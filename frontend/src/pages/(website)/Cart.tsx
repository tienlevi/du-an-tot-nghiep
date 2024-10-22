import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import i18n from './components/common/components/LangConfig';
import WhiteButton from './components/common/components/WhiteButton';
import RedButton from './components/common/components/RedButton';
import ActiveLastBreadcrumb from './components/common/components/Link';
import useAuth from '@/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  decreaseQuatityCart,
  getCart,
  increaseQuatityCart,
  removeFromCart,
} from '@/services/cart';
import type { CartTypes } from '@/types/cart';
import { Product } from '@/types/product';
import { getProducts } from '@/services/product';

const Cart = () => {
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

  const total = useMemo(() => {
    const result = carts?.reduce((price, product) => {
      return price + product.price * (product.quantity ?? 0);
    }, 0);
    return result;
  }, [cartItems]);

  const { mutate } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async (id: string) => {
      return await removeFromCart(id, user?._id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const { mutate: increaseQuantity } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async (id: string) => {
      return await increaseQuatityCart(id, user?._id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const { mutate: decreaseQuantity } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async (id: string) => {
      return await decreaseQuatityCart(id, user?._id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return (
    <div className="max-w-screen-lg mx-auto mt-48 flex flex-col gap-10">
      <ActiveLastBreadcrumb path="Home/Cart" />
      <div className="grid grid-cols-6 py-6 px-2 md:px-14 shadow rounded">
        <h2 className="text-base w-full">Chức năng</h2>
        <h2 className="text-base w-full">Image</h2>
        <h2 className="text-base w-full">{i18n.t('cart.header.product')}</h2>
        <h2 className="text-base w-full">{i18n.t('cart.header.price')}</h2>
        <h2 className="text-base w-full ">{i18n.t('cart.header.quantity')}</h2>
        <h2 className="text-base w-full">{i18n.t('cart.header.subtotal')}</h2>
      </div>
      {carts?.map((item: Product) => (
        <div
          key={item?._id}
          className="grid grid-cols-6 py-6 px-2 md:px-14 shadow rounded"
        >
          <div
            className="flex items-center cursor-pointer"
            onClick={() => mutate(item._id!)}
          >
            Xóa giỏ hàng
          </div>
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
          <div className="flex items-center">
            <div className="flex items-center justify-center border-2 border-gray-300 rounded w-14 h-10">
              <button
                onClick={() => increaseQuantity(item._id!)}
                className="px-1 rounded-full hover:bg-gray-200 text-gray-400 "
              >
                +
              </button>
              <p className="text-gray-500">{item.quantity}</p>
              <button
                onClick={() => decreaseQuantity(item._id!)}
                className="px-1 rounded-full hover:bg-gray-200 text-gray-400 "
              >
                -
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500">${item.price * item.quantity!}</p>
          </div>
        </div>
      ))}
      {/* Buttons for returning to shop, applying coupon, and proceeding to checkout */}
      <div className="flex justify-between items-center mt-2">
        <Link to="..">
          <WhiteButton name={'Return to shop'} onClick={() => {}} />
        </Link>

        <WhiteButton name={i18n.t('whiteButtons.updateCart')} />
      </div>
      <div className="flex items-center mt-4 md:flex-row gap-8 flex-col justify-between ">
        <div className="flex items-center md:justify-between justify-center mt-4 gap-2 ">
          <input
            type="text"
            placeholder={i18n.t('checkOut.couponCode')}
            className="border border-gray-900 rounded-md p-3 w-[160px] lg:w-[260px] text-sm md:text-base"
          />
          <RedButton name={i18n.t('redButtons.applyCoupon')} />
        </div>

        <div className="flex justify-between flex-col gap-6  border border-gray-900 rounded-md py-8 px-6 md:w-[470px]">
          <p className="text-xl font-semibold">{i18n.t('cart.cartTotal')}</p>
          <div className="flex justify-between mt-4 border-b">
            <p className="text-xl">{i18n.t('cart.total')}:</p>
            <p className="text-xl">${total}</p>
          </div>
          <div className="flex justify-between mt-4 border-b">
            <p className="text-xl">{i18n.t('cart.shipping')}:</p>
            <p className="text-xl">{i18n.t('cart.free')}</p>
          </div>{' '}
          <div className="pl-[100px] justify-center items-center">
            <Link to="/checkout">
              <RedButton name={i18n.t('redButtons.processToCheckout')} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
