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
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <img className='w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2' src={review.user_photo ? review.user_photo : user} alt="" />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.user_name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Review;