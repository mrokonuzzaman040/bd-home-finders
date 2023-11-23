
// import React from 'react';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';


const HeroSection = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <div className="bg-indigo-400 glass text-white py-20">
                        <div className="container mx-auto">
                            <h1 className="text-4xl font-bold mb-4">Find Your Brand-New Dwelling</h1>
                            <p className="text-lg mb-8">Find your dream home with us</p>
                            <button className="btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50">
                                Get Started
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default HeroSection;
