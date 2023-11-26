import { useQuery } from '@tanstack/react-query';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import useAuth from '../../../Components/Hooks/useAuth';
import Swal from "sweetalert2";

// Icons
import { BsClockHistory } from "react-icons/bs";
import { MdBlockFlipped } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md"
import { Link } from 'react-router-dom';

const AgentAddedPropertys = () => {
    const axiosSecure = useSecureApi();
    const { user } = useAuth();
    const { data: propertys = [], isPending: loading, refetch }
        = useQuery({
            queryKey: ['propertys'],
            queryFn: async () => {
                const res = await axiosSecure.get(`/propertys/agent/${user.email}`);
                return res.data;
            }
        })


    const handelReject = async (id) => {
        const res = await axiosSecure.patch(`/status/${id}`, { home_status: 'Rejected' }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Status Updated',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
        }
        refetch();
    }

    const handelDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/propertys/${id}`);
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Deleted',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Something went wrong',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                refetch();
            }
        });
    };

    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    Image
                                </th>
                                <th>House Name</th>
                                <th>House Location</th>
                                <th>Agent Name</th>
                                <th>Price Range</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                propertys.map((item, index) => <tr key={item._id}>
                                    <td>
                                        <img src={item.home_photo} alt="" className='w-24 h-24' />
                                    </td>
                                    <td>
                                        {item.home_name}
                                    </td>
                                    <td>
                                        {item.home_location}
                                    </td>
                                    <td className="text-right"><span className='avater'><img src={user.photoURL} alt="" /></span> {item.home_owner_name}</td>
                                    <td>
                                        <td className="text-right">${item.home_starting_price} - ${item.home_ending_price}</td>
                                    </td>
                                    <td className=''>
                                        {
                                            item.home_status === 'Pending' ?
                                                <buttons className='btn text-blue-400'><BsClockHistory />Pending</buttons>
                                                :
                                                item.home_status === 'Verified' ?
                                                    <button className='btn text-green-400'><FaCheckCircle></FaCheckCircle>{item.home_status}</button> :
                                                    <button className='btn text-red-400'><MdBlockFlipped></MdBlockFlipped>{item.home_status}</button>
                                        }
                                    </td>
                                    <td className=''>
                                        {
                                            item.home_status === 'x' ? <>
                                            </> :
                                                <Link to={`agentUpateProparty/update/${item._id}`} className='btn text-red-400' ><MdBlockFlipped></MdBlockFlipped></Link>
                                        }
                                    </td>
                                    <td className=''>
                                        <button className='btn text-red-400' onClick={() => handelDelete(item._id)}><MdDelete></MdDelete></button>
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

export default AgentAddedPropertys;