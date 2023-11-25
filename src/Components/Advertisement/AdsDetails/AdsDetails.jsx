import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { MdOutlineVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaChartArea } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";

const AdsDetails = () => {

    const { _id, location, image, price_range, verification_status, description, open_house, home_highlights, home_details, home_facility } = useLoaderData();

    const { floor_space, lot_size, year_built } = home_details;
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center p-4">
                <img src={image} alt="image" />
            </div>
            <div className="flex bg-indigo-300 p-10 justify-between items-center">
                <div className=" flex flex-col justify-start gap-2">
                    <h2 className='text-xl flex items-center gap-2'> <FaMapMarkerAlt /> Location: {location}</h2>
                    <p className='text-xl flex items-center gap-2 font-bold'><LuBadgeDollarSign /> Price Range: {price_range}</p>
                    <p className='checkbox-primary'>{
                        verification_status === "verified" ? <p className='flex items-center justify-start gap-1'><MdOutlineVerified className='text-green-700' />Verified</p> : <p className='flex items-center justify-start gap-1'> <GoUnverified className='text-red-700' />Unverified</p>
                    }</p>
                </div>
                <div className="">
                    <button className='btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50'><FaHeartCirclePlus /> Add to wishlist</button>
                </div>
            </div>

            <div className="flex flex-col bg-indigo-300 p-10">
                <h2 className='text-2xl text-black'>Description</h2>
                <div className="">
                    <p className='text-gray-700'>
                        {description}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 justify-center bg-indigo-300 p-10">
                <div className="">
                    <h2 className='text-2xl text-black'>Open House</h2>
                    <div className="">
                        <p className='text-gray-700'>
                            {open_house}
                        </p>
                    </div>
                </div>
                <div className="items-center">
                    <h2 className='text-2xl text-black'>Home Highlights</h2>
                    <div className="">
                        <p className='text-gray-700'>
                            {home_highlights}
                        </p>
                    </div>
                </div>
            </div>

            <div className=" bg-indigo-300 p-10">
                <h2 className='text-2xl text-black'>Home Details</h2>
                <div className="">
                    <p className='text-gray-700'>
                        {
                            floor_space ? <p className='flex items-center gap-1'><FaChartArea className='text-green-700' />Floor Space: {floor_space}</p> : <p className='flex items-center gap-1'> <CgUnavailable className='text-red-700' />Floor Space: {floor_space}</p>
                        }
                    </p>
                    <p className='text-gray-700'>
                        {
                            lot_size ? <p className='flex items-center gap-1'><MdOutlineVerified className='text-green-700' />Lot Size: {lot_size}</p> : <p className='flex items-center gap-1'> <CgUnavailable className='text-red-700' />Lot Size: {lot_size}</p>
                        }
                    </p>
                    <p className='text-gray-700'>
                        {
                            year_built ? <p className='flex items-center gap-1'><MdOutlineVerified className='text-green-700' />Year Built: {year_built}</p> : <p className='flex items-center gap-1'> <CgUnavailable className='text-red-700' />Year Built: {year_built}</p>
                        }
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 justify-center bg-indigo-300 p-10">
                <div className="">
                    <h2 className='text-2xl text-black'>Home Facilities</h2>
                    <div className="">
                        {
                            home_facility?.map(facility => <p className='text-gray-700'>
                                <p className='flex items-center gap-1'><MdOutlineVerified className='text-green-700' />{facility}</p>
                            </p>)
                        }
                    </div>
                </div>
                <div className="items-center">
                    <h2 className='text-2xl text-black'>Home Highlights</h2>
                    <div className="flex gap-3">
                        <p className='text-gray-700'>
                            {home_highlights.map(highlight => <p className='flex items-center gap-1'><MdOutlineVerified className='text-green-700' />{highlight}</p>)
                            }
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdsDetails;


