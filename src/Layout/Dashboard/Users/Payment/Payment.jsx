import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
        <div className="mt-2">
            <div className="bg-indigo-300 rounded-xl p-2">
                <div className="">
                    <h1 className="text-3xl text-white font-bold text-center mb-5 ">Payment</h1>
                </div>
            </div>
            <div className="mt-5">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;