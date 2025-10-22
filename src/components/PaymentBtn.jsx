import { CreditCardIcon } from 'lucide-react';
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentBtn = ({productId, deliveryAddress, amount}) => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const loadRazorpay = ()=>{
        return new Promise ((resolve) =>{
            const script = document.createElement("script");
            script.src= "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = ()=> resolve(true);
            script.onerror = ()=> resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async()=>{
        const response = await loadRazorpay();
        if(!response){
            alert("razorpay SDK failed to load");
            return;
        }


        const orderResponse = await axios.post(`${API_URL}/payment/create-order`, {
            amount,
            productId,
            deliveryAddress,
        }, {withCredentials:true});

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: amount*100,
            currency: "INR",
            name: "College MarketPlace",
            description: "Test Transaction",
            order_id: orderResponse.data.razorpayOrder.id,
            handler: async function (response){
                const verifyRes = await axios.post(`${API_URL}/payment/verify-payment`,{
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: orderResponse.data.order._id
                }, {withCredentials:true});

                if(verifyRes.data.success){
                    console.log(verifyRes.data);
                    navigate(`/payment-success/${orderResponse.data.order._id}`);
                    
                }else{
                    alert("Payment verification failed");
                }
            },

            prefill: {
                name: "Abhishek Kumar",
                email: "abc@gmai.com",
                contact: "9874575226"
            },
            theme: {
                color: "#3399cc",
            },
            method: {
                upi: true,
                netbanking: true,
                card: true,
                wallet: true,
                paylater: true,
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

  return (
    <button type='submit' className='flex justify-center items-center gap-3 border-2 border-gray-200 px-4 py-3 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-800 ' 
    onClick={handlePayment}>
        <CreditCardIcon size={18} className='text-white' />
        <span className='text-md font-semibold text-white'>Proceed to payment</span>
    </button>
  )
}

export default PaymentBtn