
import React from 'react';

const HeroSection = () => {
    return (
        <section className="bg-gray-900 text-white py-20">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-4">Welcome to RealState</h1>
                <p className="text-lg mb-8">Find your dream home with us</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
