import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Components/Hooks/useAuth";
import usePublicApi from "../../../Components/Hooks/usePublicApi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

// Icons
import { MdOutlineDeleteForever } from "react-icons/md";


const MyReviews = () => {
    const { user } = useAuth();
    const axiosPublic = usePublicApi();

    const { data: reviews = [], isPending: loading, refetch }
        = useQuery({
            queryKey: ['reviews'],
            queryFn: async () => {
                const res = await axiosPublic.get(`/reviews/${user.email}`);
                return res.data;
                refetch();
            }
        });

    const deleteReview = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title> Review ||bdHomeFinders</title>
                <link rel="canonical" href="https://i.ibb.co/VxJBfnG/rokon-high-resolution-logo-transparent.png" />
            </Helmet>
            <div className="mt-2">
                {
                    reviews.map(review => (

                        <div className="w-full">
                            <div className="bg-white shadow-lg rounded-lg p-4 mb-4 grid grid-cols-1">
                                <h2>Property Titel: {review.home_name}</h2>
                                <div>
                                    <div className="flex items-center mb-2">
                                        <p>Agent Name: {review.home_owner_name}</p>
                                    </div>
                                    <div className="">
                                        <p>Review: {review.details}</p>
                                    </div>
                                    <p>Review Time: {review.review_time}</p>
                                    <div className="flex justify-end">
                                        <button onClick={() => { deleteReview(review._id) }}><MdOutlineDeleteForever className="text-red-300 text-xl" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default MyReviews;