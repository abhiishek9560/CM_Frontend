import { MessageCircle, ShoppingBag, Star, Upload } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios';

const Purchased = () => {

  const {user} = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;


  const getDeliveryStatusBgColor = (status)=>{
    if(status === "Delivered"){
      return "bg-pink-100 text-pink-700"
    }
    else if(status === "Pending"){
      return "bg-yellow-100 text-yellow-700"
    }
    else if(status === "Paid"){
      return "bg-green-100 text-green-600"
    }
    else if(status === "Cancelled"){
      return "bg-red-100 text-red-700"
    }
  }


  useEffect(()=>{
    if(!user?._id){
      return
    }

    // axios.get(`http://localhost:3000/user/orders/${user._id}`, {withCredentials:true})
    axios.get(`${API_URL}/user/orders/${user?._id}`, {withCredentials:true})
    .then((res)=>{
      setOrders(res.data.orders);
      console.log(res.data);
    })
    .catch((error)=>{
      console.log(error)
    })
  },[user]);

  return (
    <div className='w-full flex px-8 py-6 bg-gray-50'>
      <div className='w-full flex flex-col gap-6 items-start border-1 border-gray-200 rounded-lg p-4 bg-white '>
        <div className='flex gap-2 justify-center items-center'>
          <ShoppingBag size={22}/>
          <span className='text-2xl font-semibold text-black'>Purchase History</span>
        </div>

        <div className='w-full flex flex-col gap-4'>
          {orders.map((order)=>(
           <div className='relative w-full grid md:grid-cols-3 gap-4 border-1 border-gray-200 py-3 px-3 rounded-lg hover:shadow-xl transition-all duration-100'>
            <div className='flex items-center gap-4'>
              <div className='h-16 w-16 flex justify-center items-center '>
                <img className='flex justify-center items-center object-cover ' src={order.product.image[0]} alt="Product_banner_Image" />
              </div>
              <div className='flex gap-2 flex-col'>
                <span className='text-lg font-medium text-black'>{order.product.title}</span>
                <span><span className='text-md font-medium text-black'>Price: </span><span className='text-md font-normal text-gray-500'>₹{order.amount}</span></span>
                <div className='flex gap-3'>
                  <button className=' flex justify-center items-center gap-2 px-3 py-1.5 border-1 border-gray-200 rounded-md hover:bg-blue-50 transition-all duration-100 cursor-pointer'>
                    <MessageCircle size={18}/>
                    <span>Contact Seller</span>
                  </button>

                  <button className=' flex justify-center items-center gap-2 px-3 py-1.5 border-1 border-gray-200 rounded-md hover:bg-blue-50 transition-all duration-100 cursor-pointer'>
                    <Star size={18}/>
                    <span>Rate Item</span>
                  </button>
                </div>
              </div>
            </div>

            <div className='flex justify-center items-center gap-1'> 
              <span className='text-md font-medium text-black'>Seller: </span> 
              <span className='text-md font-normal text-gray-500'>{order.seller.name}</span>
            </div>

            <div className='flex justify-center items-center gap-1'>
              <span className='text-md font-medium text-black'>Ordered:</span>
              <span className='text-md font-normal text-gray-500'>{order.product.createdAt.slice(0,10)}</span>
            </div>

            <div className={`absolute flex justify-center items-center top-2 right-6  px-3.5 py-0.5 rounded-xl ${getDeliveryStatusBgColor(order.status)}`}>
              <span className='text-sm font-medium'>{order.status}</span>
            </div>
           </div>
          ))}

          <div className='w-full flex justify-center items-center'>
          {orders.length === 0? (<div className='w-full flex flex-col gap-3 justify-center items-center border-1 border-gray-200 rounded-lg p-6 bg-gray-50'>
            <span className='text-7xl'>🔍</span>
            <span className='text-xl font-medium text-gray-800'>Your order list is empty</span>
            <button onClick={()=>navigate("/products-hub")} className='flex gap-2 justify-center items-center px-8 border-1 border-gray-300 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-870 hover:scale-105 transition-all duration-150 cursor-pointer '>
              <span className='text-lg font-medium text-white'>Buy something for you</span>
            </button>
          </div>): (<p></p>)}
        </div>
          
        </div>
      </div>
    </div>
  )
}

export default Purchased