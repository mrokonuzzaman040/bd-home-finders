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
import UerHome from '../Layout/Dashboard/Users/UerHome';
import UserWishlist from '../Layout/Dashboard/Users/UserWishlist';
import UserPropertyBougth from '../Layout/Dashboard/Users/UserPropertyBougth';
import MyReviews from '../Layout/Dashboard/Users/MyReviews';
import AgentHome from '../Layout/Dashboard/Agent/AgentHome';
import AgentRequestProperty from '../Layout/Dashboard/Agent/AgentRequestProperty';
import AgentAddProperty from '../Layout/Dashboard/Agent/AgentAddProperty';
import AgentReviews from '../Layout/Dashboard/Agent/AgentReviews';
import AgentSoldProperty from '../Layout/Dashboard/Agent/AgentSoldProperty';
import ManageProperty from '../Layout/Dashboard/Admin/ManageProperty';
import AdminReviews from '../Layout/Dashboard/Admin/AdminReviews';
import AllProperties from '../Components/AllProperties/AllProperties';
import ErrorPAge from '../Components/Pages/Error/ErrorPAge';

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
                path: '/allProperties',
                element: <AllProperties></AllProperties>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><AdsDetails></AdsDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/propertys/${params.id}`)
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
            // admin routes
            {
                path: 'adminHome',
                element: <PrivateRoute><AdminHome></AdminHome></PrivateRoute>,
            },
            {
                path: 'addProparty',
                element: <PrivateRoute><AddProperty></AddProperty></PrivateRoute>,
            },
            {
                path: 'manageProparty',
                element: <PrivateRoute><ManageProperty></ManageProperty></PrivateRoute>,
            },
            {
                path: 'manageUsers',
                element: <PrivateRoute><ManageUser></ManageUser></PrivateRoute>,
            },
            {
                path: 'manageReview',
                element: <PrivateRoute><AdminReviews></AdminReviews></PrivateRoute>,
            },
            // user routes
            {
                path: 'userHome',
                element: <PrivateRoute><UerHome></UerHome></PrivateRoute>,
            },
            {
                path: 'wishlists',
                element: <PrivateRoute><UserWishlist></UserWishlist></PrivateRoute>,
            },
            {
                path: 'boughtPropertys',
                element: <PrivateRoute><UserPropertyBougth></UserPropertyBougth></PrivateRoute>,
            },
            {
                path: 'review',
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>,
            },
            // agent routes
            {
                path: 'agentHome',
                element: <PrivateRoute><AgentHome></AgentHome></PrivateRoute>,
            },
            {
                path: 'agentsRequest',
                element: <PrivateRoute><AgentRequestProperty></AgentRequestProperty></PrivateRoute>,
            },
            {
                path: 'agentProperty',
                element: <PrivateRoute><AgentAddProperty></AgentAddProperty></PrivateRoute>,
            },
            {
                path: 'agentReview',
                element: <PrivateRoute><AgentReviews></AgentReviews></PrivateRoute>,
            },
            {
                path: 'soldPropertys',
                element: <PrivateRoute><AgentSoldProperty></AgentSoldProperty></PrivateRoute>,
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            }
        ],
    },
    {
        path: "*",
        element: <ErrorPAge></ErrorPAge>,
    }
]);


export default Routers;