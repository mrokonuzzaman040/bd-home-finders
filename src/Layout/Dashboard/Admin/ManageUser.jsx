import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../../../Components/Hooks/useSecureApi";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import profilePic from '../../../assets/image/user.png';

const ManageUser = () => {
    const axiosSecure = useSecureApi();
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: 'users',
        queryFn: async () => axiosSecure.get('/users').then(res => res.data),
    });

    console.log(users);


    return (
        <div>
            <div>
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl">All Users</h2>
                    <h2 className="text-3xl">Total Users: {users.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>User Info</th>
                                <th>UID</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={profilePic} alt="img" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                    <div className="text-sm opacity-50">{user ? user.role : 'User'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.email}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">{user._id}</span>
                                        </td>
                                        <td>Verified</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">Delete</button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;