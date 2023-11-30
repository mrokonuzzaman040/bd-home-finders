import React, { useEffect, useState } from 'react';
import usePublicApi from '../../Hooks/usePublicApi';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import user from '../../../assets/image/user.png';



const Review = () => {

    const [reviews, setReviews] = useState([]);
    const publicRequest = usePublicApi();

    useEffect(() => {
        publicRequest.get('/reviews')
            .then(res => {
                setReviews(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
        , [publicRequest]);

    return (
        <section className="my-20">
            <Swiper className="mySwiper">
                {reviews.map(review => (
                    <SwiperSlide key={review._id}>
                        <div className="flex flex-col justify-center items-center mx-24 my-16 gap-3">
                            <div className="">
                                <img className='w-[80px] h-[80px] rounded-full' src={review.user_photo ? review.user_photo : user} alt="" />
                            </div>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.user_name ? review.user_name : 'User'}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Review;