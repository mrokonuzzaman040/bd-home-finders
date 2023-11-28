import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useSecureApi from '../../../../Components/Hooks/useSecureApi';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../../../Components/Hooks/useAuth';
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState('');
    const data = useLoaderData()
    console.log(data);
    const axiosSecure = useSecureApi();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { buyer_name, email, home_location, home_name, home_owner_email, home_owner_name, offer_date, offer_price, offer_time, home_ending_price, home_starting_price } = data;

    const totalPrice = offer_price;
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })


        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    propertyId: data._id,
                    offerStatus: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the taka paisa",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/boughtPropertys')
                }

            }
        }
    }

    return (
        <div className="">
            <div className="">
                <div className="">
                    <h1 className="">Checkout</h1>
                </div>
                <div className="grid grid-cols-3 gap-3 border-green-400 rounded-lg bg-indigo-300 p-4">
                    <div className="">
                        <p className="mb-2 uppercase">Buyer Name: {buyer_name}</p>
                        <p className="mb-2 uppercase">Buyer Email: {email}</p>
                        <p className="mb-2 uppercase">Offer Time: {offer_time} Date: {offer_date}</p>
                    </div>
                    <div className="">
                        <p className="mb-2 uppercase">Home Name: {home_name}</p>
                        <p className="mb-2 uppercase">Home Location: {home_location}</p>
                        <p className="mb-2 uppercase">Price Range: ${home_starting_price} - ${home_ending_price}</p>
                    </div>
                    <div className="">
                        <p className="mb-2 uppercase">Owner Name: {home_owner_name}</p>
                        <p className="mb-2 uppercase">Owner Email: {home_owner_email}</p>
                    </div>
                </div>
                <div className="p-4 text-center text-2xl">
                    <h2>You Have to pay total: ${offer_price}</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <p className="">Please enter your payment information</p>
                <CardElement className='bg-green-300 p-10'>
                </CardElement>
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;