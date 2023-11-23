import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Common/Navbar/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Home;