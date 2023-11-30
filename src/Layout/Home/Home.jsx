import React from 'react';
import HeroSection from '../../Components/Banner/Hero/HeroSection';
import Advertisement from '../../Components/Advertisement/Advertisement';
import Review from '../../Components/Banner/Reviews/Review';
import ContactSection from '../../Components/ContactSection/ContactSection';

const Home = () => {
    return (
        <div className='flex flex-col gap-4'>
            <HeroSection></HeroSection>
            <Advertisement></Advertisement>
            <Review></Review>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;