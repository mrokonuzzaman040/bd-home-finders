import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../../Components/Hooks/useAuth';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import Swal from 'sweetalert2';

const AgentRejectUpdate = () => {
    const data = useLoaderData();
    const seccureApi = useSecureApi();
    const {
        home_photo,
        home_name,
        home_starting_price,
        home_ending_price,
        home_location,
        home_owner_email,
        home_owner_name,
    } = data;
    const handleUpdate = (e) => {
        e.preventDefault();
        const home_name = e.target.update_home_name.value;
        const home_starting_price = e.target.update_home_starting_price.value;
        const home_ending_price = e.target.update_home_ending_price.value;
        const home_location = e.target.update_home_location.value;

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to update this property!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3B82F6',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                seccureApi.patch(`/propertys/reupdate/${data._id}`, {
                    home_name,
                    home_starting_price,
                    home_ending_price,
                    home_location,
                    home_status: 'pending',
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                'Updated!',
                                'Your property has been updated.',
                                'success'
                            )
                        }
                        else {
                            Swal.fire(
                                'Failed!',
                                'Something went wrong.',
                                'error'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            <div className="">
                <form onSubmit={handleUpdate} className="flex flex-col items-center">
                    <img src={home_photo} alt="" className="w-24 h-24" />
                    <input
                        name='update_home_name'
                        type="text"
                        defaultValue={home_name}
                        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    />
                    <input
                        name='update_home_starting_price'
                        type="number"
                        defaultValue={home_starting_price}
                        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    />
                    <input
                        name='update_home_ending_price'
                        type="number"
                        defaultValue={home_ending_price}
                        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    />
                    <input
                        name='update_home_location'
                        type="text"
                        defaultValue={home_location}
                        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    />
                    <input
                        name='updte_home_owner_name'
                        disabled
                        type="text"
                        value={home_owner_name}
                        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    />
                    <input
                        name='update_home_owner_email'
                        disabled
                        type="text"
                        value={home_owner_email}
                        className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Update
                    </button>
                </form>

            </div>
        </div>
    );
};

export default AgentRejectUpdate;