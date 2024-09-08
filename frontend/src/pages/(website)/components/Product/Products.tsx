import RedTitle from '../common/components/RedTitle';
import Arrows from '../common/components/Arrows';
import ViewAll from '../common/components/ViewAll';
import i18n from '../common/components/LangConfig';
import { useQuery } from '@tanstack/react-query';
import { getProductByLimit } from '@/services/product';
import { Product } from '@/common/types/product';
import ProductItem from '../common/components/ProductItem';

const Products = () => {
  const { data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProductByLimit(4);
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
            <ProductItem
              key={index}
              _id={item._id!}
              discount={item.discount!}
              image={item.image!}
              price={item.price}
              title={item.name}
            />
          ))}
        </div>
      </div>
      <div className=" flex justify-center">
        <ViewAll name={i18n.t('redButtons.viewAllProducts')} />
      </div>
    </>
  );
};

export default Products;
