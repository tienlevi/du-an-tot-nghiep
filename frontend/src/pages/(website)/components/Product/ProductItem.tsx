import RedTitle from '../common/components/RedTitle';
import Arrows from '../common/components/Arrows';
import ViewAll from '../common/components/ViewAll';
import i18n from '../common/components/LangConfig';
import { useQuery } from '@tanstack/react-query';
import { getProductByLimit } from '@/services/product';
import { Product } from '@/common/types/product';
import { Link } from 'react-router-dom';

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
          {data?.map((item, index) => (
            <div className="relative mx-2 ">
              <div className="relative rounded flex items-center justify-center bg-zinc-100 w-[270px] h-80 md:h-60 transform transition-transform duration-300 hover:scale-105 focus:outline-none hover:-translate-y-2">
                {item.discount && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white py-1 px-3 m-2 rounded">
                    -{item.discount}%
                  </div>
                )}
                <Link to={{ pathname: `/allProducts` }}>
                  <img
                    loading="lazy"
                    src={item.image}
                    className="max-h-52  w-full object-contain"
                  />
                </Link>
              </div>
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
                {/* <span>
                 <div className="flex mt-2 text-gray-500 text-sm font-semibold gap-2 items-center ">
                   <RatingComp
                     text={i18n.t('productPage.review')}
                     variant="primary"
                   />
                 </div>
               </span> */}
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
