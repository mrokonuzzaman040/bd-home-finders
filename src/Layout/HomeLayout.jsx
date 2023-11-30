import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar/Navbar";
import Footer from "../Components/Common/Footer/Footer";
import { Helmet } from "react-helmet";

const HomeLayout = () => {
    return (
        <div className="flex flex-col gap-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>bdHomeFinders</title>
                <link rel="canonical" href="https://i.ibb.co/VxJBfnG/rokon-high-resolution-logo-transparent.png" />
            </Helmet>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default HomeLayout;