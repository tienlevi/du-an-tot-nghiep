import React, { useState, useEffect } from 'react';

const SlideShow = () => {
    const images = [
        'https://p-vn.ipricegroup.com/trends-article/cong-nghe-det-adidas-climacool-va-adidas-climachill-medium.jpg',
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474084OFI/hinh-adidas_023530656.jpg',
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474084VKC/anh-adidas-full-hd_023525827.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Slide change every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Container to display the image */}
            <div className="w-full h-[80%] object-cover">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full  transition-transform duration-700 ease-in-out"
                />
            </div>

            {/* Previous button */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 hover:scale-110 transition-all duration-300 ease-in-out"
            >
                &lt;
            </button>

            {/* Next button */}
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 hover:scale-110 transition-all duration-300 ease-in-out"
            >
                &gt;
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SlideShow;