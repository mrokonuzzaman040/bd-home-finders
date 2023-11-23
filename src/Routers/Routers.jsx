import React from 'react';

import {
    createBrowserRouter,
} from "react-router-dom";
import Home from '../Layout/HomeLayout';
import HomeLayout from '../Layout/Home/Home';

const Routers = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
        ],
    },
]);


export default Routers;