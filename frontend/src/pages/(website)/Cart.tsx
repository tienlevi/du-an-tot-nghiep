import i18n from './components/common/components/LangConfig';
/* eslint-disable react/prop-types */
import { useCart } from '../../context/CartContext';
import CartItem from './components/Cart/CartItem';
import WhiteButton from './components/common/components/WhiteButton';
import RedButton from './components/common/components/RedButton';
import ActiveLastBreadcrumb from './components/common/components/Link';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/services/cart';
import { IconButton } from '@mui/material';
import { Product } from '@/types/product';

const Cart = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      return await getCart(user?._id as string);
    },
  });

  console.log(data);
  console.log(user?._id);

  return (
    <div className="max-w-screen-lg mx-auto mt-48 flex flex-col gap-10">
      <ActiveLastBreadcrumb path="Home/Cart" />
      <div className="flex flex-row justify-between items-center py-6 px-2 md:px-14 shadow rounded md:gap-24  ">
        <h2 className="text-base">{i18n.t('cart.header.product')}</h2>
        <h2 className="text-base ml-10">{i18n.t('cart.header.price')}</h2>
        <h2 className="text-base ">{i18n.t('cart.header.quantity')}</h2>
        <h2 className="text-base hidden md:flex">
          {i18n.t('cart.header.subtotal')}
        </h2>
      </div>
      {data?.products?.map((item: Product) => (
        <div
          key={item._id}
          className=" flex flex-row justify-between items-center py-2 md:py-6 px-2 md:pr-12 md:pl-4 shadow rounded gap-4 md:gap-16  "
        >
          <div className="flex items-center md:gap-4">
            <div className="flex w-28">
              <IconButton className="absolute -top-4">X</IconButton>
              <Link to={{ pathname: `/allProducts/${item.name}` }}>
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16"
                />
              </Link>
            </div>
            <p className="hidden lg:flex text-xs md:text-base ">{item.name}</p>
          </div>
          <div className="flex items-center ">
            <p className="text-gray-500">${item.price}</p>
          </div>
          <div className="flex items-center border-2 border-gray-300  rounded px-2 py-1  mr-2 gap-3">
            <button className=" rounded-full hover:bg-gray-200 text-gray-400 ">
              +
            </button>
            <p className="text-gray-500">{1}</p>

            <div className=" ">
              <button className="px-1 rounded-full hover:bg-gray-200 text-gray-400 ">
                -
              </button>
            </div>
          </div>
          <div className="items-center hidden md:flex">
            {/* <p className="text-gray-500">${item.price * quantity}</p> */}
          </div>
        </div>
      ))}{' '}
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
            {/* <p className="text-xl">${subtotal}</p> */}
          </div>
          <div className="flex justify-between mt-4 border-b">
            <p className="text-xl">{i18n.t('cart.subtotal')}:</p>
            {/* <p className="text-xl">${total}</p> */}
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
