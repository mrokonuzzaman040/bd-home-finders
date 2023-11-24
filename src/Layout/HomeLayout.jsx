import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar/Navbar";
import Footer from "../Components/Common/Footer/Footer";

const HomeLayout = () => {
    return (
        <div className="flex flex-col gap-4">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default HomeLayout;