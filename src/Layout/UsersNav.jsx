import React, { useContext } from 'react';
import userPic from '../assets/image/user.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Components/Providers/AuthProvider';

const UsersNav = ({ photoURL, displayName }) => {

    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
        <div>
            <div className="navbar rounded-lg bg-indigo-400">
                <div className="flex-1">
                    <h2 className='text-xl p-2'>Welcome, <span className='font-bold hover:text-2xl'>{displayName}</span></h2>
                </div>
                <div className="flex-none gap-2">
                    {/* <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div> */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {
                                    photoURL ? <img src={photoURL} alt="" /> : <img src="https://i.ibb.co/1v2qgjv/avater.png" alt="" />
                                }
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to={'/dashboard/profile'} className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersNav;