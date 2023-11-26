import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { MdOutlineVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import { BsFillHouseHeartFill } from "react-icons/bs";
import { MdPerson } from "react-icons/md";
import { GiHouse } from "react-icons/gi";
import { FaBath, FaBed, FaCar } from "react-icons/fa";
import { MdOutlineLandscape } from "react-icons/md";
import { TbResize } from "react-icons/tb";
import useAuth from '../../Hooks/useAuth';
import useSecureApi from '../../Hooks/useSecureApi';
import usePublicApi from '../../Hooks/usePublicApi';



const AdsDetails = () => {
    const { user } = useAuth();
    const secureApi = usePublicApi();
    const { _id,
        home_location,
        home_name,
        home_description,
        home_price,
        home_type,
        home_area,
        home_bed,
        home_bath,
        home_garage,
        home_size,
        home_status,
        home_photo,
        home_owner_name,
        home_owner_photo,
        home_owner_email,
    } = useLoaderData();


    const handelWishClick = (id) => {
        console.log('wish clicked');
        const wishData = {
            home_id: id,
            home_name,
            home_location,
            home_price,
            home_photo,
            home_owner_name,
            home_owner_photo,
            home_owner_email,
            home_status,
            username: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }

        secureApi.post('/wishlist', wishData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center p-4">
                <img src={home_photo} alt="home_photo" />
            </div>
            <div className="flex bg-indigo-300 p-10 justify-between items-center">
                <div className=" flex flex-col justify-start gap-2">
                    <h2 className='text-xl flex items-center gap-2'><BsFillHouseHeartFill ></BsFillHouseHeartFill>House Name: {home_name}</h2>
                    <h2 className='text-xl flex items-center gap-2'> <FaMapMarkerAlt /> Location: {home_location}</h2>
                    <p className='text-xl flex items-center gap-2 font-bold'><LuBadgeDollarSign /> Price Range: {home_price}</p>
                    <p className='checkbox-primary'>{
                        home_status === "verified" ? <p className='flex items-center justify-start gap-1'><MdOutlineVerified className='text-green-700' />Verified</p> : <p className='flex items-center justify-start gap-1'> <GoUnverified className='text-red-700' />Unverified</p>
                    }</p>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={() => handelWishClick(_id)} className='btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50'><FaHeartCirclePlus /> Add to wishlist</button>
                    <h2 className='flex justify-center items-center btn'><MdPerson ></MdPerson> Agent Name: {home_owner_name}</h2>
                </div>
            </div>

            <div className="flex flex-col bg-indigo-300 p-10">
                <h2 className='text-2xl text-black'>Description</h2>
                <div className="">
                    <p className='text-gray-700'>
                        {home_description}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 justify-center bg-indigo-300 p-10">
                <div className="">
                    <h2 className='text-2xl text-black'>House Type</h2>
                    <div className="uppercase text-white">
                        <p className='text-gray-700 flex items-center gap-2'>
                            <GiHouse></GiHouse> Type : {home_type}
                        </p>
                        <p className='text-gray-700 flex items-center gap-2'>
                            <MdOutlineLandscape ></MdOutlineLandscape> Area : {home_area}
                        </p>
                        <p className='text-gray-700 flex items-center gap-2'>
                            <TbResize></TbResize> PROPERTY SIZE : {home_size}
                        </p>

                    </div>
                </div>
                <div className="items-center">
                    <h2 className='text-2xl text-black'>Home Highlights</h2>
                    <div className="">
                        <p className='text-gray-700 flex items-center gap-2'>
                            <FaBed></FaBed> Bed : {home_bed}
                        </p>
                        <p className='text-gray-700 flex items-center gap-2'>
                            <FaBath></FaBath> Bath : {home_bath}
                        </p>
                        <p className='text-gray-700 flex items-center gap-2'>
                            <FaCar></FaCar> GARAGE : {home_garage}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsDetails;


