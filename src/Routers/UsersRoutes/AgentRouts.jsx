import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import useAgent from "../../Components/Hooks/useAgent";

const AgentRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAgent, isAgentLoading] = useAgent();
    const location = useLocation();

    if (loading || isAgentLoading) {
        return <>
            <div className="flex items-center justify-center h-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="loading loading-infinity loading-lg text-green-600 text-9xl"></span>
                </div>
            </div>
        </>
    }

    if (user && isAgent) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AgentRoutes;