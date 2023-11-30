import React, { useContext } from 'react';
import { AuthContext } from '../../Components/Providers/AuthProvider';
import { Helmet } from "react-helmet";

const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className='flex flex-col items-center justify-center gap-10 mt-10'>
            <Helmet>
                <meta charSet="utf-8" />
                <title> Profile || bdHomeFinders</title>
                <link rel="canonical" href="https://i.ibb.co/VxJBfnG/rokon-high-resolution-logo-transparent.png" />
            </Helmet>

            <div className="">
                <img className='rounded-full' src={user.photoURL} alt="" />
            </div>
            <div className="">
                <h1>Profile</h1>
                <p>{user.email}</p>
            </div>
            <div className="">
            </div>
        </div>
    );
};

export default Profile;