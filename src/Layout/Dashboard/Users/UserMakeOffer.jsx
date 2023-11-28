import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

// icons
import { FaClock, FaDollarSign, FaMapMarkerAlt, FaVoicemail } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { FaMailBulk } from "react-icons/fa";
import { BsFillHouseHeartFill } from "react-icons/bs";
import useAuth from '../../../Components/Hooks/useAuth';
import useSecureApi from '../../../Components/Hooks/useSecureApi';

const UserMakeOffer = () => {
    const { user } = useAuth();
    const data = useLoaderData();
    const axiosPrivet = useSecureApi();
    const { home_name, home_location, home_owner_name, home_starting_price, home_ending_price, home_photo, email } = data;
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePriceChange = () => {
        const offer_price = document.getElementsByName('offer_price')[0].value;
        const buyer_email = user.email;
        const buyer_name = user.displayName;
        const buyer_id = user.uid;
        const home_id = data._id;
        const home_owner_email = data.home_owner_email;
        const home_owner_name = data.home_owner_name;
        const home_name = data.home_name;
        const home_location = data.home_location;
        const home_photo = data.home_photo;
        const home_starting_price = data.home_starting_price;
        const home_ending_price = data.home_ending_price;
        const status = 'pending';
        const offer_time = new Date().toLocaleTimeString();
        const offer_date = new Date().toLocaleDateString();
        const offer = { offer_price, buyer_email, buyer_name, buyer_id, home_id, home_owner_email, home_owner_name, home_name, home_location, home_photo, home_starting_price, home_ending_price, status, offer_time, offer_date };

        if (offer_price >= home_starting_price && offer_price <= home_ending_price) {
            axiosPrivet.post('/offer_requests', offer)
                .then(res => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your offer has been sent successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Something went wrong',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please enter a valid price',
                showConfirmButton: false,
                timer: 1500
            })

        }

    }

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
                        <p className='flex items-center text-xl'> <FaDollarSign /> Origial Price: ${home_starting_price} - ${home_ending_price}</p>
                        <div className='text-xl flex items-center gap-2'>
                            <FaDollarSign /> Price:
                            <input name='offer_price' type="text" onClick={handlePriceChange} />
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