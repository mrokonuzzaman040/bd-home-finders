import React, { useContext } from 'react';
import { AuthContext } from '../../Components/Providers/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className='flex flex-col items-center justify-center gap-10 mt-10'>
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