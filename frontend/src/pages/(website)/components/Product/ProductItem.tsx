import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProductByLimit } from '@/services/product';
import { Product } from '@/types/product';
import { FaCartShopping } from 'react-icons/fa6';
import RedTitle from '../common/components/RedTitle';
import Arrows from '../common/components/Arrows';
import ViewAll from '../common/components/ViewAll';
import i18n from '../common/components/LangConfig';
import { addToCart } from '@/services/cart';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';

interface Props {
  limitProduct: number;
}

const ProductItem = ({ limitProduct }: Props) => {
  const { data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProductByLimit(limitProduct);
      return response;
    },
  });
  const { user } = useAuth();

  const { mutate } = useMutation({
    mutationKey: ['products'],
    mutationFn: async (products: any) => {
      await addToCart(user?._id!, products);
    },
    onSuccess: () => {
      if (user === null) {
        toast.error('Hãy đăng nhập tài khoản để thêm giỏ hàng');
      } else {
        toast.success('Thêm giỏ hàng thành công');
      }
    },
    onError: () => {},
  });

  return (
    <>
      <div className="mx-2 xl:mx-0 my-12">
        <RedTitle title={i18n.t('allProducts.redTitle')} />
        <div className="flex justify-between items-center md:mr-6 md:mb-4">
          <h2 className="text-xl md:text-3xl font-semibold ">
            {i18n.t('allProducts.title')}
          </h2>
          <Arrows />
        </div>
        <div className="relative mt-10 grid grid-cols-4 gap-2 md:gap-12 transition-transform duration-300 transform ">
          {data?.map((item) => (
            <div key={item._id} className="relative mx-2">
              <div className="absolute top-0 left-0 z-10">
                {item.discount ? (
                  <p className="bg-red-500 text-white py-1 px-3 m-2 rounded">
                    -{item.discount}%
                  </p>
                ) : (
                  <p className="bg-red-500 text-white py-1 px-3 m-2 rounded">
                    0%
                  </p>
                )}
              </div>
              <div className="absolute top-10 left-0 z-10">
                <div
                  onClick={() => {
                    mutate([{ productId: item._id, quantity: 1 }]);
                  }}
                  className="bg-red-500 text-white p-3 m-2 rounded cursor-pointer hover:bg-white hover:text-black duration-300"
                >
                  <FaCartShopping style={{ fontSize: 20 }} />
                </div>
              </div>
              <Link
                to={`/product/${item._id}`}
                className="relative rounded flex items-center justify-center bg-zinc-100 w-[270px] h-80 z-0 md:h-60 transform transition-transform duration-300 hover:scale-105 focus:outline-none hover:-translate-y-2"
              >
                <img
                  loading="lazy"
                  src={item.image}
                  className="max-h-52  w-full object-contain"
                />
              </Link>
              <div className="flex md:items-start items-center flex-col ">
                <h3 className="text-lg font-base mt-4">{item.name}</h3>
                <p className="text-red-500  text-sm font-semibold line-clamp-2">
                  ${item.price}
                  {item.discount && (
                    <span className="ml-2 text-gray-500 text-sm font-semibold line-through">
                      ${item.price + (item.price * item.discount) / 100}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-center">
        <ViewAll name={i18n.t('redButtons.viewAllProducts')} />
      </div>
    </>
  );
};

export default ProductItem;
