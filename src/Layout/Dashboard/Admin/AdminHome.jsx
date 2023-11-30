import { FaUserShield } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { Helmet } from "react-helmet";




const AdminHome = () => {
    return (
        <div>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Admin Home ||bdHomeFinders</title>
                <link rel="canonical" href="https://i.ibb.co/VxJBfnG/rokon-high-resolution-logo-transparent.png" />
            </Helmet>
            <div className="grid grid-cols-3 w-auto justify-center items-end text-center gap-4 mt-2 text-white">
                <div className="bg-indigo-500 glass rounded-lg">
                    <div className="text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title"><FaUserShield />
                                Total User</h2>
                            <p>{ }</p>
                        </div>
                    </div>
                </div>
                <div className="bg-indigo-500 glass rounded-lg">
                    <div className="text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title"><GiFamilyHouse />
                                Proparty</h2>
                            <p>{ }</p>
                        </div>
                    </div>
                </div>
                <div className="bg-indigo-500 glass rounded-lg">
                    <div className="text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title"><MdPendingActions />
                                Request</h2>
                            <p>{ }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AdminHome;