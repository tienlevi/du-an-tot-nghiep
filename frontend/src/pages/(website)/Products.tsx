import { useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { getProducts } from '@/services/product';
import i18n from './components/common/components/LangConfig';
import RedButton from './components/common/components/RedButton';

const AllProducts = () => {
  // Lấy dữ liệu sản phẩm từ API
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProducts();
      return response;
    },
  });

  // Khởi tạo số sản phẩm được hiển thị
  const [displayedItems, setDisplayedItems] = useState(4); // Bắt đầu với 4 sản phẩm

  // Hàm xử lý tải thêm sản phẩm
  const handleLoadMore = () => {
    setDisplayedItems((prev) => prev + 4); // Tăng số sản phẩm hiển thị lên 4
    // window.scrollTo({
    //   top: window.scrollY - 1500,
    //   behavior: 'smooth',
    // });
  };

  return (
    <div className="mt-40 flex flex-col gap-5">
      <Typography variant="h3" align="center" gutterBottom>
        {i18n.t('allProducts.title')}
      </Typography>
      <div className="mx-auto">
        <div className="mx-2 xl:mx-0 my-12">
          <div className="relative mt-10 grid grid-cols-4 gap-2 md:gap-12">
            {isLoading ? (
              <p>Loading products...</p> // Hiển thị thông báo khi đang tải
            ) : (
              data?.slice(0, displayedItems).map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  className="relative mx-2"
                >
                  <div className="relative rounded flex items-center justify-center bg-zinc-100 w-[270px] h-80 md:h-60 transition-transform duration-300 hover:scale-105">
                    {item.discount && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white py-1 px-3 m-2 rounded">
                        -{item.discount}%
                      </div>
                    )}
                    <img
                      loading="lazy"
                      src={item.image}
                      className="max-h-52 w-full object-contain"
                    />
                  </div>
                  <div className="flex md:items-start items-center flex-col">
                    <h3 className="text-lg font-base mt-4">{item.name}</h3>
                    <p className="text-red-500 text-sm font-semibold">
                      ${item.price}
                      {item.discount && (
                        <span className="ml-2 text-gray-500 text-sm font-semibold line-through">
                          ${item.price + (item.price * item.discount) / 100}
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      {displayedItems < (data?.length || 0) && ( // Chỉ hiển thị nút "Load More" nếu còn sản phẩm để tải
        <button
          onClick={handleLoadMore}
          type="button"
          className="md:mx-auto text-center rounded-md px-5 py-3 mt-8 shadow hover:shadow-md active:shadow-inner transition
            hover:bg-gray-50 border text-[#696A75] hover:text-[#696A75] border-[#696A75] hover:border-[#696A75]
            hover:scale-105 hover:-translate-y-2 transform duration-300 ease-in-out"
        >
          {i18n.t('whiteButtons.loadMore')}
        </button>
      )}
      <div className="mt-6 flex justify-around items-center md:mx-12">
        <Link to="/category">
          <RedButton name={i18n.t('redButtons.exploreByCategory')} />
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;
