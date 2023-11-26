import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import useAuth from '../../../Components/Hooks/useAuth';
import { Link } from 'react-router-dom';


// Icons
import { GoUnverified } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";



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


    const handelDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishlist/${id}`)
                    .then(res => {
                        console.log(res.data);
                        const newWishlist = wishlist.filter(wish => wish._id !== id);
                        setWishlist(newWishlist);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    }


    return (
        <div className="bg-indigo-300 rounded-xl p-4 mt-2">
            <div className="grid grid-cols-3 gap-10">
                {
                    wishlist.map(wish =>
                        <div key={wish._id} className="card lg:w-96 w-64 card-compact card-bordered rounded-xl bg-indigo-400">
                            <figure>
                                <img className="sm:h-[124px] lg:h-[240px] w-full" src={wish.home_photo} alt="Image" />
                            </figure>
                            <div className="card-body glass">
                                <h2 className="card-title">Titel:{wish.home_name}</h2>
                                <p>Price: ${wish.home_starting_price} to ${wish.home_ending_price}</p>
                                <p>Location: {wish.home_location}</p>
                                <p>Agent Name: {wish.home_owner_name}</p>
                                <p className='checkbox-primary'>{
                                    wish.home_status === "Verified" ? <p className='flex items-center justify-start gap-1'><MdOutlineVerified className='text-green-700' />Verified</p> : <p className='flex items-center justify-start gap-1'> <GoUnverified className='text-red-700' />Unverified</p>
                                }</p>
                                <div className="flex gap-2 justify-between">
                                    <div className="card-actions justify-end">
                                        <Link to={`/offer/${wish._id}`} className="btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50"><BiSolidOffer></BiSolidOffer>Offer</Link>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button onClick={() => { handelDelete(wish._id) }} className="btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50"> <MdDeleteForever className='text-red-400'></MdDeleteForever></button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default UserWishlist;