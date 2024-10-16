import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CartTypes } from '@/types/cart';
import { getCart } from '@/services/cart';
import { Product } from '@/types/product';
import { getProducts } from '@/services/product';
import useAuth from '@/hooks/useAuth';
import RedButton from '../common/components/RedButton';
import { createOrder } from '@/services/order';
import { toast } from 'react-toastify';

function ProductCheckOut() {
  const { handleSubmit } = useFormContext();
  const { user } = useAuth();
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

  const total = useMemo(() => {
    const result = cartItems?.reduce((price, product) => {
      return price + product.price;
    }, 0);
    return result;
  }, [cartItems]);

  const carts = cartItems?.map((item) => {
    return {
      ...item,
      quantity: cart?.products.find((product) => product.productId === item._id)
        ?.quantity,
    };
  });

  const items = carts?.map((item) => {
    return { name: item.name, price: item.price, image: item.image };
  });

  const { mutate } = useMutation({
    mutationKey: ['order'],
    mutationFn: async (data: object) => {
      return await createOrder({ ...data, totalPrice: total, items: items });
    },
    onSuccess: () => {
      toast.success('Đặt hàng thành công');
    },
  });

  const onSubmit = (data: object) => {
    console.log({ ...data, totalPrice: total, items: items });
    mutate({ ...data, totalPrice: total, items: items });
  };

  return (
    <div className="flex justify-between flex-col gap-4 md:gap-8  px-4 w-full md:w-[425px]">
      <div className="flex flex-col gap-4">
        {carts?.map((item) => (
          <div key={item._id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={item.image} alt="" width={100} height={100} />
              <p className="ml-2 text-[18px] break-words w-[200px]">
                {item.name}
              </p>
            </div>
            <div>{item.price}$</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between  border-b">
          <p className="text-base">Sub Total:</p>
          <p className="text-base">${total}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between  border-b">
          <p className="text-base">Shipping:</p>
          <p className="text-base">Free</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between  border-b">
          <p className="text-base">Total:</p>
          <p className="text-base">${0}</p>
        </div>
      </div>
      {/* Payment methods */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-base">Methods:</p>
        </div>
        <div className="flex justify-between">
          <label>
            <input type="radio" name="paymentMethod" value="bank" />
            Bank
          </label>
        </div>
        <div className="flex justify-between">
          <label>
            <input type="radio" name="paymentMethod" value="cashOnDelivery" />
            Cash
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 space-x-4 md:w-[510px]">
        <input
          type="text"
          placeholder={'Code'}
          className="border border-gray-900 rounded-md p-3  w-[170px] md:w-[280px]"
        />
        <RedButton name={'Apply'} />
      </div>
      <div className="mr-auto" onClick={handleSubmit(onSubmit)}>
        <RedButton name={'Order'} />
      </div>
    </div>
  );
}

export default ProductCheckOut;
