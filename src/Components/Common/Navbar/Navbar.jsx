import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const items = <>
        <li>
            <NavLink to={'/home'} className="">Home</NavLink>
        </li>
        <li>
            <a>About</a>
        </li>
        <li>
            <a>Blog</a>
        </li>
        <li>
            <a>Contact</a>
        </li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 bg-transparent border-b-indigo-800">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                            {items}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">YourLogo</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {items}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ?
                        <div className="flex gap-4">
                            <Link to={'/dashboard'} className='btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50'>Dashboard</Link>
                            <button onClick={handleLogOut} className='btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50'>Logout</button>
                        </div> :
                        <div className="flex gap-4">
                            <Link to={'/register'} className="btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50">Sign Up</Link>
                            <Link to={'/login'} className="btn text-white border-none bg-indigo-500 shadow-lg shadow-indigo-500/50">Sign In</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;