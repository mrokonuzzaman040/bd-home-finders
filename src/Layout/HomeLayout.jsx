import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar/Navbar";

const HomeLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default HomeLayout;