import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { FaCartShopping } from 'react-icons/fa6';

import { addToCart } from '@/services/cart';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';

interface Props {
  product: Product; // Change this to accept a single product
}

const GetProductsByCategory = ({ product }: Props) => {
  const { user } = useAuth();

  const { mutate } = useMutation({
    mutationKey: ['products'],
    mutationFn: async (products: any) => {
      await addToCart(user?._id!, products);
    },
    onSuccess: () => {
      toast.success('Thêm giỏ hàng thành công');
    },
    onError: () => {
      !user && toast.error('Hãy đăng nhập tài khoản để thêm giỏ hàng');
    },
  });

  return (
    <div className="relative mx-2">
      <div className="relative rounded flex items-center justify-center bg-zinc-100 w-[270px] h-80 md:h-60 transform transition-transform duration-300 hover:scale-105 focus:outline-none hover:-translate-y-2">
        <div className="absolute top-0 left-0">
          {product.discount ? (
            <p className="bg-red-500 text-white py-1 px-3 m-2 rounded">
              -{product.discount}%
            </p>
          ) : (
            <p className="bg-red-500 text-white py-1 px-3 m-2 rounded">
              0%
            </p>
          )}
        </div>
        <div className="absolute top-10 left-0">
          <div
            onClick={() => {
              mutate([{ productId: product._id, product, quantity: 1 }]);
            }}
            className="bg-red-500 text-white p-3 m-2 rounded cursor-pointer hover:bg-white hover:text-black duration-300"
          >
            <FaCartShopping style={{ fontSize: 20 }} />
          </div>
        </div>
        <Link to={{ pathname: `/allProducts` }}>
          <img
            loading="lazy"
            src={product.image}
            className="max-h-52 w-full object-contain"
          />
        </Link>
      </div>
      <div className="flex md:items-start items-center flex-col">
        <h3 className="text-lg font-base mt-4">{product.name}</h3>
        <p className="text-red-500 text-sm font-semibold line-clamp-2">
          ${product.price}
          {product.discount && (
            <span className="ml-2 text-gray-500 text-sm font-semibold line-through">
              ${product.price + (product.price * product.discount) / 100}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default GetProductsByCategory;
