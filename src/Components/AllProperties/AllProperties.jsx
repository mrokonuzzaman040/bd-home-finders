import React from 'react';
import usePublicApi from '../Hooks/usePublicApi';
import { useQuery } from '@tanstack/react-query';

import { Link } from "react-router-dom";
import { GoUnverified } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";

const AllProperties = () => {
    const axiosPublic = usePublicApi();

    const { data: propertys = [], isPending: loading, refetch }
        = useQuery({
            queryKey: ['propertys'],
            queryFn: async () => {
                const verifiedPropertys = await axiosPublic.get('/propertys/verified');
                const propertys = verifiedPropertys.data;
                return propertys;
            }
        })
    return (
        <div>
            <div className="bg-indigo-300 rounded-xl p-4">
                <div className="">
                    <h1 className="text-3xl text-white font-bold text-center mb-5 ">All Verified Home's Are Here</h1>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    {
                        propertys.map(ads => <div key={ads._id} className="card card-compact bg-indigo-400">
                            <figure>
                                <img className="sm:h-[124px] lg:h-[240px] w-full" src={ads.home_photo} alt="Image" />
                            </figure>
                            <div className="card-body glass">
                                <h2 className="card-title">{ads.home_name}</h2>
                                <p>$ {ads.home_price}</p>
                                <p className='checkbox-primary'>{
                                    ads.home_status === "Verified" ? <p className='flex items-center justify-start gap-1'><MdOutlineVerified className='text-green-700' />Verified</p> : <p className='flex items-center justify-start gap-1'> <GoUnverified className='text-red-700' />Unverified</p>
                                }</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/details/${ads._id}`} className="btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50">Details</Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProperties;