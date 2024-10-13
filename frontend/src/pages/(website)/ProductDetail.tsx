import { useState } from 'react';
import i18n from './components/common/components/LangConfig';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/product';
import { Product } from '@/types/product';
import { getCategories } from '@/services/category';
import { Category } from '@/types/category';
import { addToCart } from '@/services/cart';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
const ProductDetail = () => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const { id } = useParams();
  const { data } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      return await getProductById(id!);
    },
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ['products'],
    mutationFn: async (products: any) => {
      return await addToCart(user?._id!, products);
    },
    onSuccess: () => {
      !user && toast.error('Hãy đăng nhập tài khoản để thêm giỏ hàng');
      toast.success('Thêm giỏ hàng thành công');
    },
  });

  // const renderStars = () => {
  //   const stars = [];

  //   for (let i = 0; i < 5; i++) {
  //     const starColor = i < data?.stars ? '#FFAD33' : '#D1D5DB';
  //     stars.push(
  //       <svg
  //         key={i}
  //         width="16"
  //         height="15"
  //         viewBox="0 0 16 15"
  //         fill={starColor}
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" />
  //       </svg>,
  //     );
  //   }
  //   return stars;
  // };

  // Function to handle size selection
  const handleSizeSelect = (size: any) => {
    setSelectedSize(size);
  };
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  const handleImageClick = () => {
    setIsImageFullScreen(!isImageFullScreen);
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-18">
        <h1 className="text-center text-[32px] font-bold mb-10">
          Chi tiết sản phẩm
        </h1>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row  gap-16">
            <div className="flex flex-col-reverse md:flex-row gap-8">
              <div className="flex  flex-row md:flex-col gap-4">
                {[...Array(4)].map((_, index) => (
                  <motion.div
                    role="button"
                    key={index}
                    className="relative flex items-center justify-center bg-zinc-100 rounded md:pt-12 md:p-8 md:h-[138px] md:w-[170px]"
                    onClick={handleImageClick}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    {/* <img
                      src={data?.imageSrc}
                      alt={data?.title}
                      className="transform transition-transform duration-300 hover:scale-105 focus:outline-none w-full h-full"
                    /> */}
                  </motion.div>
                ))}
              </div>
              {/* Main image */}
              {/* <button> */}
              <div
                role="button"
                className="relative flex items-center justify-center bg-zinc-100 w-full rounded md:pt-12 md:p-8 md:h-[600px] md:w-[500px]"
                onClick={handleImageClick}
              >
                <img
                  src={data?.image}
                  className="transform transition-transform duration-300 hover:scale-105 focus:outline-none w-full max-h-full"
                />
              </div>
              {/* </button> */}
            </div>
            <div className="flex gap-5 flex-col">
              <div className="flex gap-4 flex-col">
                <h2 className="text-xl md:text-2xl font-bold ">{data?.name}</h2>
                <div className="flex  text-gray-500 text-sm gap-2 items-center ">
                  {
                    categories?.find(
                      (category) => category._id === data?.category,
                    )?.name
                  }
                </div>
                <div className="flex gap-10">
                  <p className="text-gray-800 text-xl md:text-2xl font-inter">
                    ${data?.price}.00
                  </p>{' '}
                </div>
              </div>
              <hr className="mx-30  border-gray-300" />
              <div className="font-inter text-xl">
                {i18n.t('productPage.colors')}:{' '}
              </div>
              <div className="font-inter text-xl flex gap-4">
                {i18n.t('productPage.size')}
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`border-2 w-8 h-8 hover:bg-red-400 hover:text-white border-gray-400 rounded text-sm ${
                      selectedSize === size ? 'bg-red-600 text-white' : ''
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="border-2 border-gray-400 rounded text-xl mb-5 font-semibold flex justify-between items-center">
                  <button
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    className="border-r-2  hover:bg-red-500 hover:text-white border-gray-400 rounded p-3"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-[160px] focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-l-2  hover:bg-red-500 hover:text-white border-gray-400 rounded p-3 "
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    mutate([{ productId: data?._id, quantity: quantity }]);
                  }}
                  className="flex items-center justify-center border border-black w-[200px] h-[55px] mb-5 hover:text-white hover:bg-red-500"
                >
                  Add To Cart
                </button>
                <Link
                  to="/checkout"
                  className="flex items-center justify-center border border-black w-[200px] h-[55px] hover:text-white hover:bg-red-500"
                >
                  <button className="text-centere">Buy now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
