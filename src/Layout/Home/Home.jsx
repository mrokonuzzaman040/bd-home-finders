import React from 'react';
import HeroSection from '../../Components/Banner/Hero/HeroSection';
import Advertisement from '../../Components/Advertisement/Advertisement';
import Review from '../../Components/Banner/Reviews/Review';

const Home = () => {
    return (
        <div className='flex flex-col gap-4'>
            <HeroSection></HeroSection>
            <Advertisement></Advertisement>
            <Review></Review>
        </div>
    );
};

export default Home;