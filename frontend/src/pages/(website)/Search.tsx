import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { ITEMS } from './components/common/functions/items';
import i18n from './components/common/components/LangConfig';
import RedButton from './components/common/components/RedButton';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/common/types/product';
import { getProductByLimit } from '@/services/product';
import instance from '@/config/axios';

const SearchProducts = () => {
  const { data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProductByLimit();
      return response;
    },
  });
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(10);
  const duplicatedItems = Array.from({ length: 2 }, () => ITEMS).flat();
  const totalItems = duplicatedItems.length;

  const [search] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [keywords, setKeywords] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const keyword = search.get('keyword') || '';
        const { data } = await instance.get(`products?name_like=${keyword}`);
        setProducts(data);
        setKeywords(keyword);
        setError(null);
      } catch (err) {
        setError('Không thể lấy dữ liệu sản phẩm');
        console.error(err);
      }
    })();
  }, [search]);
  const handleLoadMore = () => {
    window.scrollTo({
      top: window.scrollY - 1500,
      behavior: 'smooth',
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayedItems(displayedItems + 10);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" mt-40 flex flex-col gap-5">
      <h1 className="text-2xl ml-48 mt-20">
        Kết quả tìm kiếm theo từ khóa: <strong>{keywords}</strong>
      </h1>
      <Typography variant="h3" align="center" gutterBottom>
        {i18n.t('allProducts.title')}
      </Typography>
      <div className="mx-auto">
        <div className="mx-2 xl:mx-0 my-12">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {displayedItems < totalItems && (
        <button
          onClick={handleLoadMore}
          type="button"
          className="md:mx-auto text-center rounded-md px-5 py-3 mt-8 shadow hover:shadow-md active:shadow-inner transition
            hover:bg-gray-50 border text-[#696A75] hover:text-[#696A75] border-[#696A75] hover:border-[#696A75]
            hover:scale-105 hover:-translate-y-2 transform  duration-300 ease-in-out"
        >
          {i18n.t('whiteButtons.loadMore')}
        </button>
      )}
      <div className="mt-6 flex justify-around items-center md:mx-12">
        {/* <Link to="..">
          <WhiteButton name={i18n.t('whiteButtons.backToHomePage')} />
        </Link> */}
        <Link to="/category">
          <RedButton name={i18n.t('redButtons.exploreByCategory')} />
        </Link>
      </div>
    </div>
  );
};

export default SearchProducts;
