import axios from 'axios';
import { Calendar, CircleCheckBig, MapPin, Package, Phone, User } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const DeliveryConfirmationPage = () => {
    const navigate = useNavigate();
    const {order_id} = useParams();
    const [order, setOrder] = useState(null);
    const [product, setProduct] = useState(null);
    const [buyer, setBuyer] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;


    // fetching order details
    const fetchOrder = async()=>{
        try{
            const response = await axios.get(`${API_URL}/payment/get-order`, {
                params:{order_id}
            });
            console.log(response.data);
            setOrder(response.data.order);
        }catch(error){

            console.log(error.message);
        }
    };

    useEffect(()=>{
        fetchOrder();
    },[order_id]);


    // fetching product details
    const fetchProduct = async()=>{
        try{
            const product_id = order.product;
            const response = await axios.get(`${API_URL}/market/get-product`, {
                params:{product_id}
            });
            console.log(response.data);
            setProduct(response.data.product);
        }catch(error){

            console.log(error.message);
        }
    };

    useEffect(()=>{
        if(!order?.product) return;
        fetchProduct();
    },[order]);


    //fetching buyer details
    const fetchBuyer = async()=>{
        try{
            const seller_id = order.buyer;
            const response = await axios.get(`${API_URL}/user/get-seller`, {
                params:{seller_id}
            });
            console.log(response.data);
            setBuyer(response.data.seller);
        }catch(error){

            console.log(error.message);
        }
    };

    useEffect(()=>{
        if(!order?.buyer) return;
        fetchBuyer();
    },[order]);


    const handleDeliveryConfirmationClick = async ()=>{
        try{
            const response = await axios.post(`${API_URL}/payment/confirm-order-delivery`, {orderId: order_id});
            console.log(response.data);
            toast.success("Delivery Confirmed");
            toast.success("Thank You seller")

        }catch(error){
            console.log(error.message);
        }
    }




  return (
    <div className='h-full w-full bg-gray-100'>
        <div className='w-full p-3.5 shadow-sm bg-white'>
            <div className='flex gap-4 ml-80'>
                <div className='flex justify-center items-center h-10 w-10 rounded-full bg-gray-200'>
                    <Package size={20}/>
                </div>
                <div className='flex flex-col '>
                    <span className='text-xl font-bold text-black'>Delivery Confirmation</span>
                    <span className='text-sm font-light text-gray-500'>{order?.orderID}</span>
                </div>
            </div>
        </div>


        <div className='w-[60%] ml-85 mt-8 flex justify-center items-center'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='w-full flex flex-col rounded-lg border-1 border-gray-300 bg-white'>
                    <div className='w-full p-5 flex items-center gap-2 rounded-t-lg bg-gradient-to-r from-blue-600 to-purple-600'>
                        <Package size={24} className='text-white'/>
                        <span className='text-2xl font-semibold text-white'>Product Details</span>
                    </div>
                    <div className='flex gap-2 mt-4 pl-4 '>
                        <div className='h-20 w-20'>
                            <img className='rounded-2xl' src={product?.image[0]} alt="Product-Image" />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-semibold text-black'>{product?.title}</span>
                            <span className='text-lg font-semibold text-black'>₹{order?.amount}</span>
                            <div className='bg-gray-100 w-fit border-1 border-gray-400 rounded-2xl px-2 flex justify-center items-center'>
                                <span className='text-[13px] font-light text-black'>OUT_FOR_DELIVERY</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-[90%] h-[1px] bg-gray-300 ml-5 mt-5'></div>
                    <div className='mt-5 ml-5 flex gap-2 items-center mb-5'>
                        <Calendar size={18} className='text-gray-500'/>
                        <span className='text-md font-light text-gray-500'>Order Dat: {order?.createdAt.slice(0,10)}</span>
                    </div>
                </div>

                <div className='w-full flex flex-col rounded-lg border-1 border-gray-300 bg-white'>
                    <div className='w-full p-5 flex items-center gap-2 rounded-t-lg bg-gradient-to-r from-green-600 to-teal-600'>
                        <Package size={24} className='text-white'/>
                        <span className='text-2xl font-semibold text-white'>Delivery Information</span>
                    </div>
                    <div className='flex gap-2 mt-4 flex-col ml-5'>
                        <div className='flex gap-2 items-center'>
                            <User size={22} className='text-gray-500'/>
                            <div className='flex flex-col'>
                                <span className='text-md font-semibold text-black'>{buyer?.name}</span>
                                <span className='text-md font-light text-gray-500'>Buyer</span>
                            </div>
                        </div>

                        <div  className='flex gap-2 items-center'>
                            <Phone size={22} className='text-gray-500'/>
                            <div className='flex flex-col'>
                                <span className='text-md font-semibold text-black'>{buyer?.phone ? ( buyer?.phone):("XXXXXXXXXX")}</span>
                                <span className='text-md font-light text-gray-500'>Contact Number</span>
                            </div>
                        </div>

                        <div  className='flex gap-2 items-center'>
                            <MapPin size={22} className='text-gray-500'/>
                            <div className='flex flex-col'>
                                <span className='text-md font-semibold text-black'>{order?.deliveryAddress.completeAddress}</span>
                                <span className='text-md font-light text-gray-500'>Hostel {order?.deliveryAddress.nearbyHostel}</span>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        </div>


        <div className='w-[60%] ml-85 mt-8 flex flex-col justify-center items-center border-1 border-gray-300 rounded-md p-4 bg-white'>
            <div className='p-4 bg-gray-200 rounded-full mb-3'>
                <CircleCheckBig size={30}/>
            </div>
            <span className='text-2xl font-bold text-black mb-3'>Confirm Delivery</span>
            <span className='text-md font-sans text-gray-800'>Have you successfully delivered this product to the buyer? Click </span>
            <span className='text-md font-sans text-gray-800 mb-5'>the button below to mark this order as delivered.</span>
            <button className='w-[51%] flex justify-center items-center gap-3 rounded-md bg-gradient-to-r from-green-600 to-teal-600 py-3 mb-3 hover:scale-105 hover:from-green-700 hover:to-teal-700 cursor-pointer transition-all duration-200 '>
                <CircleCheckBig size={18} className='text-white'/>
                <span onClick={handleDeliveryConfirmationClick} className='text-sm font-semibold text-white'>Mark as Delivered</span>
            </button>
            <span className='text-xs font-normal text-gray-500'>This action cannot be undone. Please ensure the product has been delivered before</span>
            <span className='text-xs font-normal text-gray-500'>confirming.</span>
        </div>
    </div>
  )
}

export default DeliveryConfirmationPage