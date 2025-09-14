import axios from 'axios';
import { CircleCheck, CircleCheckBig, Download, MapPin, MessageCircle, Package, TicketCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const {order_id} = useParams();
    const [order, setOrder] = useState(null);
    const [seller, setSeller] = useState(null);
    const [product, setProduct] = useState(null);
    const payDay = new Date(order?.createdAt).toLocaleDateString();
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchOrder = async ()=>{
        try{
            const response = await axios.get(`${API_URL}/payment/get-order`, {
                params: {order_id}
            });
        console.log(response.data);
        setOrder(response.data.order);
        }catch(error){
            console.log(error.message);
        }
    };

    const fetchProductSeller = async()=>{
        try{
            if(order?.seller){
                const seller_id = order?.seller;
            
            
            const response = await axios.get(`${API_URL}/user/get-seller`, {
                params: {seller_id}
            });
            console.log(response.data);
            setSeller(response.data.seller)
        }
        else{
            console.log(order?.seller);
            console.log("NO seller");
        }
        }catch(error){
            console.log(error.message);
        }
    };

    const fetchProduct = async()=>{
        try{
            if(order?.product){
                const product_id = order?.product;
            
            const response = await axios.get(`${API_URL}/market/get-product`, {
                params: {product_id}
            });
            console.log(response.data);
            setProduct(response.data.product);
        }

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(order_id){
            fetchOrder();
        }
    },[order_id]);
    
    useEffect(()=>{
        if(order?.seller){
            fetchProductSeller();
        }
    }, [order]);

    useEffect(()=>{
        if(order){
            fetchProduct();
        }
    },[order]);

    


  return (
    <div className='w-full flex flex-col justify-center items-center gap-6 mt-10'>
        <div className='w-[40%] flex flex-col justify-center items-center space-y-3'>
            <div className='p-4 bg-green-100 rounded-full'>
                <CircleCheckBig size={30} className='text-green-600 font-bold'/>
            </div>
            <span className='text-3xl font-bold text-green-800'>Payment Successful!</span>
            <span className='text-md font-normal text-green-600'>Thank you for your purchase. Your order has been confirmed.</span>
        </div>

        <div className='w-[40%] flex flex-col items-start gap-3 p-5 bg-white rounded-lg border-1 border-gray-300 shadow-lg'>
            <div className='w-full flex gap-3 justify-start items-center'>
                <Package size={20}/>
                <span className='text-2xl font-semibold text-gray-950'>Order Details</span>
            </div>
            <div className='w-full flex justify-between'>
                <div className='flex flex-col'>
                    <span className='text-[14px] font-normal text-gray-500'>Order ID</span>
                    <span className='text-[13px] font-semibold text-black'>{order?.orderID}</span>
                </div>

                <div className='flex justify-center items-center bg-green-100 h-6 px-2 rounded-2xl'>
                    <span className='text-sm font-semibold text-green-800'>confirmed</span>
                </div>
            </div>

            <div className='w-full h-[1px] bg-gray-300 px-6'></div>

            <div className='w-full flex gap-2'>
                <div className='h-[80px] w-[18%] rounded-lg'>
                    <img className='h-full w-full object-contain' src={product?.image[0]} alt="product image not avialable" />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-md font-bold text-black'>{product?.title}</span>
                    <span className='text-sm font-normal text-gray-500'>Sold by: {seller?.name}</span>
                    <span className='text-md font-bold text-black'>₹{product?.price}</span>
                </div>
            </div>

            <div className='w-full h-[1px] bg-gray-200 px-6'></div>


            <div className='w-full flex justify-between'>
                <div className='flex flex-col'>
                    <span className='text-md font-light text-gray-500'>Payment Id</span>
                    <span className='text-sm font-semibold text-gray-700'>{order?.paymentInfo.razorpay_payment_id}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-md font-light text-gray-500'>Payment Date</span>
                    <span className='text-sm font-semibold text-gray-700'>{payDay}</span>
                </div>
            </div>

        </div>


        <div className='w-[40%] flex flex-col items-start gap-3 p-5 bg-white rounded-lg border-1 border-gray-300 shadow-lg'>
            <div className='w-full flex gap-3 justify-start items-center'>
                <MapPin size={20}/>
                <span className='text-2xl font-semibold text-gray-950'>Delivery Information</span>
            </div>

            <div className='w-full flex flex-col gpa-1'>
                <span className='text-sm font-light text-gray-500'>Delivery Address</span>
                <span className='text-sm font-semibold text-gray-800'>{order?.deliveryAddress.completeAddress}</span>
            </div>
            <div className='w-full flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='text-sm font-light text-gray-500'>Estimated Delivery</span>
                    <span className='text-sm font-semibold text-gray-800'>09/09/2025</span>
                </div>

                <div className='flex flex-col gap-1'>
                    <span className='text-sm font-light text-gray-500'>Seller Name</span>
                    <span className='text-sm font-semibold text-gray-800'>{seller?.name}</span>
                </div>

                <div className='flex flex-col gap-1'>
                    <span className='text-sm font-light text-gray-500'>Seller Contact</span>
                    <span className='text-sm font-semibold text-gray-800'>{seller?.phone}</span>
                </div>
            </div>
        </div>

        <div className='w-[40%] flex flex-col items-start gap-3'>
            <div className=' w-full grid grid-cols-2 gap-3'>
                <div className='flex justify-center items-center gap-2 bg-white p-2 border-1 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100'>
                    <Download/>
                    <button className='text-sm font-semibold text-gray-900'>Download Invoice</button>
                </div>
                <div className='flex justify-center items-center gap-2 bg-white p-2 border-1 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100'>
                    <MessageCircle/>
                    <button className='text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100'>Contact Seller</button>
                </div>
            </div>
            <button onClick={()=>navigate("/products-hub")} className='w-full text-sm font-semibold text-white bg-gray-950 p-2 rounded-md border-1 border-gray-700 cursor-pointer hover:bg-gray-900'>Continue Shopping</button>
        </div>
        
        <div className="w-[40%] p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
                <li>• You'll receive an email confirmation shortly</li>
                <li>• The seller will be notified and will prepare your item</li>
                <li>• We'll send a QR on your email. Use this to confirm the delivery.</li>
                <li>• You can contact the seller for delivery address confirmation.</li>
            </ul>
        </div>
    </div>
  )
}

export default PaymentSuccess