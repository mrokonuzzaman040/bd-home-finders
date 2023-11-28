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
import usePublicApi from '../../Hooks/usePublicApi';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const AdsDetails = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const secureApi = usePublicApi();
    const { _id,
        home_location,
        home_name,
        home_description,
        home_ending_price,
        home_starting_price,
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
        const wishData = {
            home_id: id,
            home_name,
            home_location,
            home_starting_price,
            home_ending_price,
            home_photo,
            home_owner_name,
            home_owner_photo,
            home_owner_email,
            home_status,
            home_owner_name,
            home_owner_photo,
            home_owner_email,
            email: user.email,
        }

        secureApi.post('/wishlist', wishData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Added to wishlist.',
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while adding to wishlist.',
                });
            });
    }


    const handelAddreview = async (event) => {
        event.preventDefault();
        const form = event.target;
        const rating = form.select_value.value;
        const details = form.textarea_dec.value;
        const review_time = new Date().toLocaleTimeString();


        const reviewData = {
            rating,
            details,
            email: user.email,
            user_name: user.displayName,
            user_photo: user.photoURL,
            home_name,
            home_location,
            home_owner_name,
            review_time,
        }
        secureApi.post('/reviews', reviewData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Review added successfully.');
                }
            })
            .catch(err => {
                toast.error('An error occurred while adding review.');
            });
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
                    <p className='text-xl flex items-center gap-2 font-bold'><LuBadgeDollarSign /> Price Range: ${home_starting_price} to ${home_ending_price}</p>
                    <p className='checkbox-primary'>{
                        home_status === "Verified" ? <p className='flex items-center justify-start gap-1'><MdOutlineVerified className='text-green-700' />Verified</p> : <p className='flex items-center justify-start gap-1'> <GoUnverified className='text-red-700' />Unverified</p>
                    }</p>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={() => handelWishClick(_id)} className='btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50'><FaHeartCirclePlus /> Add to wishlist</button>
                    <h2 className='flex justify-center items-center btn'><MdPerson ></MdPerson> Agent Name: {home_owner_name}</h2>
                    <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
                    <dialog id="my_modal_3" className="modal">
                        {/* <div className="modal-box w-11/12 max-w-5xl"> */}
                        <div className="modal-box w-11/12 max-w-5xl">
                            <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
                                <div className="text-center p-4">Click On ESC to close the Modal.</div>
                                <div className="mt-3 text-center text-4xl font-bold">Give a Review</div>
                                <form onSubmit={handelAddreview} className="p-8">
                                    <div className="my-6 flex gap-4 items-center justify-between">
                                        <h2 className='block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-black shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm'>Rate us Out of 5</h2>
                                        <select
                                            name="select_value" id="select" className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-black shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
                                            {/* <option className="font-semibold text-black">Please Select</option> */}
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <textarea
                                            placeholder='Write your message here' name="textarea_dec" id="text" cols="30" rows="10" className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button type='submit' className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">Add Review</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* </div> */}
                    </dialog>
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
            <ToastContainer />
        </div>
    );
};

export default AdsDetails;