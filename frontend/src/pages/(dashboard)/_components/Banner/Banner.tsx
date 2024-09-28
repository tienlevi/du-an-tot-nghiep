import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const slides = [
    {
      imgSrc: 'https://shopgame-clone.vercel.app/Asset/Image/Slide/image2.jpg',
      text: 'Enhance Your Printing Experience',
      Subtext:
        'Explore emium printers and consumables for exceptional results',
      buttonLink: '/offer',
      buttonText: 'Shop Now',
    },
    {
      imgSrc: 'https://shopgame-clone.vercel.app/Asset/Image/Slide/image4.jpg',
      text: 'Quality Printing Solutions',
      Subtext:
        'Discover our wide range of printers and consumables designed for professional printing needs.',
      buttonLink: '/shop',
      buttonText: 'About-us',
    },
    {
      imgSrc:
        'https://shopgame-clone.vercel.app/Asset/Image/Slide/MWII-S04-FREE-ACCESS-TOUT.jpg',
      text: 'Efficiency Redefined',
      Subtext:
        'Maximize productivity with our advanced printers and high-quality consumables. ',
      buttonLink: '/contact',
      buttonText: 'Contact-us',
    },
  ];
  const swiperParams: any = {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
  };

  return (
    <>
      <Swiper
        {...swiperParams}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              className="relative w-[100%] lg:h-[600px] object-cover"
              src={item.imgSrc}
              alt="Slide 1"
            />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center z-1 text-white">
              <h1 className="text-[37px] font-bold [text-shadow:_0_2px_10px_rgb(0_0_0_/_70%)]">
                {item.text}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
