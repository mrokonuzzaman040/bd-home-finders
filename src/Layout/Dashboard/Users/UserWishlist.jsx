import React, { useEffect, useState } from 'react';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import useAuth from '../../../Components/Hooks/useAuth';
import { Link } from 'react-router-dom';

// Icons
import { GoUnverified } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";

const UserWishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureApi();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/wishlist?email=${user.email}`)
            .then(res => {
                setWishlist(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [axiosSecure, user.email]);

    console.log(wishlist);
    return (
        <div className="bg-indigo-300 rounded-xl p-4 mt-2">
            <div className="grid grid-cols-3 gap-10">
                {
                    wishlist.map(wish =>
                        <div key={wish._id} className="card card-compact card-bordered rounded-xl bg-indigo-400">
                            <figure>
                                <img className="sm:h-[124px] lg:h-[240px] w-full" src={wish.home_photo} alt="Image" />
                            </figure>
                            <div className="card-body glass">
                                <h2 className="card-title">Titel:{wish.home_name}</h2>
                                <p>$ {wish.home_price}</p>
                                <p>$ {wish.home_location}</p>
                                <p>$ {wish.home_owner_name}</p>
                                <p className='checkbox-primary'>{
                                    wish.home_status === "Verified" ? <p className='flex items-center justify-start gap-1'><MdOutlineVerified className='text-green-700' />Verified</p> : <p className='flex items-center justify-start gap-1'> <GoUnverified className='text-red-700' />Unverified</p>
                                }</p>
                                <div className="card-actions justify-end">
                                    <Link to={`details/${wish._id}`} className="btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50">Details</Link>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default UserWishlist;