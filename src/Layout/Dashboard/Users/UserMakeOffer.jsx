import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

// icons
import { FaClock, FaDollarSign, FaMapMarkerAlt, FaVoicemail } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { FaMailBulk } from "react-icons/fa";
import { BsFillHouseHeartFill } from "react-icons/bs";
import useAuth from '../../../Components/Hooks/useAuth';

const UserMakeOffer = () => {
    const { user } = useAuth();
    const data = useLoaderData();
    const { home_name, home_location, home_owner_name, home_price, home_photo, email } = data;
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePriceChange = (e) => {
        alert('Clicked')
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center p-4">
                    <img src={home_photo} alt="home_photo" />
                </div>
                <div className=" bg-indigo-300 p-10 justify-between items-center">
                    <h2 className='text-xl flex items-center gap-2'><BsFillHouseHeartFill ></BsFillHouseHeartFill>House Name: {home_name}</h2>
                </div>
                <div className="flex bg-indigo-300 p-10 justify-between items-center">
                    <div className=" flex flex-col justify-start gap-2">
                        <h2 className='text-xl flex items-center gap-2'> <FaMapMarkerAlt /> Location: {home_location}</h2>
                        <div className='text-xl flex items-center gap-2'>
                            <FaDollarSign /> Price:
                            <input type="text" value={home_price} onChange={handlePriceChange} />
                        </div>
                        <h2 className='text-xl flex items-center gap-2'><MdPerson /> Agent Name: {home_owner_name}</h2>
                    </div>
                    <div className="">
                        <p className='text-xl flex items-center gap-2'><MdPerson /> Buyer: {user.displayName}</p>
                        <p className='text-xl flex items-center gap-2'><FaMailBulk></FaMailBulk> Buyer Email: {user ? email : email}</p>
                        <p className='text-xl flex items-center gap-2'><FaClock></FaClock>Current Time: {currentTime}</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button onClick={() => { handlePriceChange() }} className='btn'>Offer Now</button>
                </div>
            </div>
        </div>
    );
};
export default UserMakeOffer;