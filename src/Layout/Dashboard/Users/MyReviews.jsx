import React from 'react';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import useAuth from '../../../Components/Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyReviews = () => {

    const { user } = useAuth();
    const axiosSecure = useSecureApi();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    // const { offer: offers = [] } = useQuery({
    //     queryKey: ['offers', payments.propertyId],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/propertys/${payments.propertyId}`)
    //         return res.data;
    //     }
    // })


    // console.log(offers);

    return (
        <div>
            <div>
                <h2 className="text3-xl">Total Payments: {payments.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>price</th>
                                <th>Transaction Id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.offerStatus}</td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyReviews;