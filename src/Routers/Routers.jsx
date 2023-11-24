import React from 'react';

import {
    createBrowserRouter,
} from "react-router-dom";

import HomeLayout from '../Layout/HomeLayout';
import Home from '../Layout/Home/Home';
import Login from '../Components/Register/Login/Login';
import SignUp from '../Components/Register/Signup/SignUp';
import PrivateRoute from './UsersRoutes/PrivateRoute';
import DashboardLayout from '../Layout/DashboardLayout';
import AdsDetails from '../Components/Advertisement/AdsDetails/AdsDetails';
import AdminHome from '../Layout/Dashboard/Admin/AdminHome';
import AddProperty from '../Layout/Dashboard/Admin/AddProperty';
import ManageUser from '../Layout/Dashboard/Admin/ManageUser';
import Profile from '../Layout/Dashboard/Profile';

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
                path: '/about',
                element: <h2>About</h2>
            },
            {
                path: '/services',
                element: <h2>Services</h2>
            },
            {
                path: '/contact',
                element: <h2>Contact</h2>
            },
            {
                path: '/details/:id',
                element: <AdsDetails></AdsDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/ads/${params.id}`)
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
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>,
            },
            {
                path: 'addProparty',
                element: <AddProperty></AddProperty>,
            },
            {
                path: 'manageProparty',
                element: <h2>Manage Proparty</h2>,
            },
            {
                path: 'manageUsers',
                element: <ManageUser></ManageUser>,
            },
            {
                path: 'manageReview',
                element: <h2>Manage Review</h2>,
            },
            // user routes
            {
                path: 'userHome',
                element: <h2>User Home</h2>,
            },
            {
                path: 'history',
                element: <h2>Not History</h2>,
            },
            {
                path: 'cart',
                element: <h2>My Cart</h2>,
            },
            {
                path: 'review',
                element: <h2>Add a Review</h2>,
            },
            {
                path: 'paymentHistory',
                element: <h2>Real Payment History</h2>,
            },
            // agent routes
            {
                path: 'agentHome',
                element: <h2>Agent Home</h2>,
            },
            {
                path: 'agentHistory',
                element: <h2>Agent History</h2>,
            },
            {
                path: 'agentCart',
                element: <h2>Agent Cart</h2>,
            },
            {
                path: 'agentReview',
                element: <h2>Agent Review</h2>,
            },
            {
                path: 'agentPaymentHistory',
                element: <h2>Agent Payment History</h2>,
            },
            {
                path: 'profile',
                element: <Profile></Profile>,
            }
        ],
    },
]);


export default Routers;