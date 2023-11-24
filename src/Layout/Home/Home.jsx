import React from 'react';
import HeroSection from '../../Components/Banner/Hero/HeroSection';
import Advertisement from '../../Components/Advertisement/Advertisement';

const Home = () => {
    return (
        <div className='flex flex-col gap-4'>
            <HeroSection></HeroSection>
            <Advertisement></Advertisement>
        </div>
    );
};

export default Home;