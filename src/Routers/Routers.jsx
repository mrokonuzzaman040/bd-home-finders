import React from 'react';

import {
    createBrowserRouter,
} from "react-router-dom";

import HomeLayout from '../Layout/HomeLayout';
import Home from '../Layout/Home/Home';
import Login from '../Components/Register/Login/Login';
import SignUp from '../Components/Register/Signup/SignUp';

const Routers = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <SignUp></SignUp>,
            },
        ],
    },
]);


export default Routers;