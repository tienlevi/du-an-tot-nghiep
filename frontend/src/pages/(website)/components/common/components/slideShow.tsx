import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const SlideShow = () => {
    const images = [
        'https://p-vn.ipricegroup.com/trends-article/cong-nghe-det-adidas-climacool-va-adidas-climachill-medium.jpg',
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474084OFI/hinh-adidas_023530656.jpg',
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474084VKC/anh-adidas-full-hd_023525827.jpg',
    ];

    return (
        <div className="relative w-full h-screen">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="w-full h-[90%]"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SlideShow;
