import useAdmin from "../Components/Hooks/useAdmin";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom"
import UsersNav from "./UsersNav";
import useAuth from "../Components/Hooks/useAuth";
import logo from '../assets/image/logo.png';

import { Link } from "react-router-dom";

// Icons
import { IoHome } from "react-icons/io5";
import { MdAddHome } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa";
import { FaGrinStars } from "react-icons/fa";







const DashboardLayout = () => {

    const { user } = useAuth();
    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 ">
                <div className="flex items-center justify-center">
                    <Link to={'/'}>
                        <img className="p-4 w-[240px]" src={logo} alt="" />
                    </Link>
                </div>
                <div className="min-h-screen rounded-t-lg mt-10 bg-indigo-400">
                    <ul className="menu p-4 gap-2">
                        {
                            isAdmin ? <>
                                <li>
                                    <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/adminHome">
                                        <IoHome></IoHome >
                                        Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/addProparty">
                                        <MdAddHome></MdAddHome >
                                        Add Proparty</NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/manageProparty">
                                        <CiSettings ></CiSettings>
                                        Manage Proparty</NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/manageUsers">
                                        <FaUserShield ></FaUserShield>
                                        Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/manageReview">
                                        <FaGrinStars ></FaGrinStars>
                                        Manage Review</NavLink>
                                </li>
                            </>
                                :
                                <>
                                    <li>
                                        <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/userHome">
                                            <FaHome></FaHome>
                                            User Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/history">
                                            <FaCalendar></FaCalendar>
                                            Not History</NavLink>
                                    </li>
                                    {/* <li>
                                    <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li> */}
                                    <li>
                                        <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/review">
                                            <FaAd></FaAd>
                                            Add a Review</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/dashboard/paymentHistory">
                                            <FaList></FaList>
                                            Real Payment History</NavLink>
                                    </li>
                                </>
                        }
                        {/* shared nav links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/">
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>
                        <li>
                            <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/order/salad">
                                <FaSearch></FaSearch>
                                Menu</NavLink>
                        </li>
                        <li>
                            <NavLink className='text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50' to="/order/contact">
                                <FaEnvelope></FaEnvelope>
                                Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>


            {/* dashboard content */}
            <div className="flex-1 p-8 max-h-screen">
                <UsersNav displayName={user.displayName} photoURL={user.photoURL} ></UsersNav>
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default DashboardLayout;