import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../../../Components/Hooks/useSecureApi";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import profilePic from '../../../assets/image/user.png';
import Swal from "sweetalert2";

const ManageUser = () => {
    const axiosSecure = useSecureApi();
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: 'users',
        queryFn: async () => axiosSecure.get('/users').then(res => res.data),
    });

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleRoleChange = (user, e) => {
        const user_role = e.target.value;
        Swal.fire({
            title: "Are you sure?",
            text: `Change role to ${user_role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`, { role: user_role })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} is an Admin Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div>
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl">All Users</h2>
                    <h2 className="text-3xl">Total Users: {users.length}</h2>
                </div>
                <div className="divider"></div>
                <div className="overflow-x-auto w-full">
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
                                    <tr key={user._id}>
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

                                        <td>
                                            <select className="btn btn-ghost btn-xs" defaultValue={user.role} onChange={(e) => handleRoleChange(user, e)}>
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                                <option value="agent">Agent</option>
                                            </select>
                                        </td>
                                        <th>
                                            <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-xs"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default ManageUser;