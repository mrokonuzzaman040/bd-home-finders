import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import usePublicApi from "../usePublicApi";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = usePublicApi();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate('/dashboard');
                    })
            })
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;