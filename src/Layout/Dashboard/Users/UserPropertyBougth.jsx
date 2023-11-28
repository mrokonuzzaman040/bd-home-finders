import React from 'react';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import { useQuery } from "@tanstack/react-query";
import useAuth from '../../../Components/Hooks/useAuth';

import { Link } from "react-router-dom";
import { GoUnverified } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { CiBadgeDollar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";





const UserPropertyBougth = () => {
    const secureApi = useSecureApi();
    const { user } = useAuth();
    const { data: offer_requests = [], isPending: loading, refetch } = useQuery({
        queryKey: ['offer_requests'],
        queryFn: async () => {
            const res = await secureApi.get(`/offer_requests/user/${user.email}`);
            return res.data;
        }
    });

    console.log(offer_requests);

    return (
        <div className='mt-2'>
            <div>
                <div className="bg-indigo-300 rounded-xl p-4">
                    <div className="">
                        <h1 className="text-3xl text-white font-bold text-center mb-5 ">All property you have bought</h1>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                        {
                            offer_requests.map(ads =>
                                <div key={ads._id} className="card w-60 card-compact bg-indigo-400">
                                    <figure>
                                        <img className="sm:h-[124px] lg:h-[240px] w-full" src={ads.home_photo} alt="Image" />
                                    </figure>
                                    <div className="card-body glass">
                                        <h2 className="text-sm">Titel: {ads.home_name}</h2>
                                        <p className='flex items-center gap-2'><FaLocationCrosshairs /> Location: {ads.home_location}</p>
                                        <p className='flex items-center gap-2'><CiBadgeDollar /> Offer Price: $ {ads.offer_price}</p>
                                        <p className='checkbox-primary'>{
                                            ads.home_status === "accepted" ? <p className='flex items-center justify-start gap-1'><MdOutlineVerified className='text-green-700' />Accepted</p> : <p className='flex items-center justify-start gap-1'> <GoUnverified className='text-red-700' />Pending</p>
                                        }</p>
                                        <p className='flex items-center gap-2'><CiUser /> Agent Name : {ads.home_owner_name}</p>
                                        <div className="card-actions justify-end">
                                            {
                                                ads.home_status === "accepted" ? <Link to={`/boughtPropertys/payment/${ads._id}`} className='btn'>Pay Now</Link> : <></>
                                            }
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPropertyBougth;