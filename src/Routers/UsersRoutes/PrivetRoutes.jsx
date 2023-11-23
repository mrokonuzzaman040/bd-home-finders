import { Navigate, useLocation } from "react-router";
import useAuth from "../../Components/Hooks/useAuth";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="spinner-border text-primary" role="status">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;