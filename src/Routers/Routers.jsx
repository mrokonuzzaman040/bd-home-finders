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
import AdminRoute from './UsersRoutes/AdminRouts';
import AgentRoutes from './UsersRoutes/AgentRouts';
import UserMakeOffer from '../Layout/Dashboard/Users/UserMakeOffer';

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
                path: 'offer/:id',
                element: <PrivateRoute><UserMakeOffer></UserMakeOffer></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/wishlist/${params.id}`)
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
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
            },
            {
                path: 'addProparty',
                element: <AdminRoute><AddProperty></AddProperty></AdminRoute>,
            },
            {
                path: 'manageProparty',
                element: <AdminRoute><ManageProperty></ManageProperty></AdminRoute>,
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>,
            },
            {
                path: 'manageReview',
                element: <AdminRoute><AdminReviews></AdminReviews></AdminRoute>,
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
                element: <AgentRoutes><AgentHome></AgentHome></AgentRoutes>,
            },
            {
                path: 'agentsRequest',
                element: <AgentRoutes><AgentRequestProperty></AgentRequestProperty></AgentRoutes>,
            },
            {
                path: 'agentProperty',
                element: <AgentRoutes><AgentAddProperty></AgentAddProperty></AgentRoutes>,
            },
            {
                path: 'agentReview',
                element: <AgentRoutes><AgentReviews></AgentReviews></AgentRoutes>,
            },
            {
                path: 'soldPropertys',
                element: <AgentRoutes><AgentSoldProperty></AgentSoldProperty></AgentRoutes>,
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