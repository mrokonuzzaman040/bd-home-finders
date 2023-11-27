import React from 'react';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import { useQuery } from "@tanstack/react-query";
import useAuth from '../../../Components/Hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



import { BsClockHistory } from "react-icons/bs";
import { MdBlockFlipped } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md"


const AgentRequestProperty = () => {
    const axiosSecure = useSecureApi();
    const { user } = useAuth();

    const { data: offers = [], isPending: loading, refetch } = useQuery({
        queryKey: ['offer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offer_requests/agent/${user.email}`);
            return res.data;
        }
    })

    const handelAccept = (id) => {
        axiosSecure.patch(`/offer_requests/${id}`, { home_status: 'accepted' })
            .then(res => {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Offer has been accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Offer has not been accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const hendelReject = (id) => {
        axiosSecure.patch(`/offer_requests/${id}`, { home_status: 'rejected' })
            .then(res => {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Offer has been accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Offer has not been accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                {/* <th>
                                    Image
                                </th> */}
                                <th>House Name</th>
                                <th>House Location</th>
                                <th>Buyer Name</th>
                                <th>Offer Price</th>
                                <th>Buyer Email</th>
                                <th>Accept</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                offers.map((item, index) => <tr key={item._id}>
                                    {/* <td>
                                        <img src={item.home_photo} alt="" className='w-24 h-24' />
                                    </td> */}
                                    <td>
                                        {item.home_name}
                                    </td>
                                    <td>
                                        {item.home_location}
                                    </td>
                                    <td className="text-right"><span className='avater'><img src={user.photoURL} alt="" /></span> {item.buyer_name}</td>
                                    <td>
                                        <td className="text-right">${item.offer_price}</td>
                                    </td>
                                    <td className=''>
                                        {item.buyer_email}
                                    </td>
                                    <td className=''>
                                        {
                                            item.home_status === 'accepted' ? <button disabled className='btn text-green-400'>Accepted</button> : <button className='btn text-green-400' onClick={() => handelAccept(item._id)}>Pending</button>
                                        }
                                    </td>
                                    <td className=''>
                                        {
                                            item.home_status === 'rejected' ? <button disabled className='btn text-red-400'>Rejected</button> : <button className='btn text-red-400' onClick={() => hendelReject(item._id)}>Reject Now</button>

                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default AgentRequestProperty;