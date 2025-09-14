import { CreditCardIcon, DollarSign, IndianRupee, MapPin, Phone, Shield, ShoppingBag, Truck, User } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import PaymentBtn from './PaymentBtn';

const OrderSummary = (product) => {
    const navigate = useNavigate();
    const deliveryCharge = 0;
    const ConvinenceCharge = 10;

  return (
    <div className='w-[45%] flex flex-col justify-center items-center bg-white rounded-lg mb-20'>
        <div className='w-full flex flex-col gap-2 px-5 py-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg'>
            <div className='flex gap-2 items-center'>
                <div className='p-2 bg-slate-700 rounded-md'>
                    <ShoppingBag className='text-white'/>
                </div>
                
                <span className='text-white text-xl font-semibold'>Order Summary</span>
            </div>
            <span className='text-md text-white font-light'>Review your order details and delivery information</span>
        </div>

        <div className='w-full p-6 flex flex-col gap-8'>

            {/* product details */}
            <div className='w-full flex items-center gap-4 bg-gray-200 rounded-lg'>
                <div className='p-4 rounded-lg'>
                    <img className='h-30 w-35 object-contain rounded-lg' src={product.image} alt="" />
                </div>
                <div className='w-full flex flex-col gap-3'>
                    <div className='text-2xl font-bold text-gray-900'>{product.title}</div>

                    <div className='flex items-center gap-2'>
                        <User size={16} className='text-gray-700'/>
                        <span><span className='text-gray-700'>Sold by: </span> <span className='text-gray-900 font-semibold'>{product.seller}</span></span>
                    </div>

                    <div className='w-full flex justify-between items-center pr-6'>
                        <div className='text-xs font-bold text-gray-900'>Quantity: 1</div>
                        <div className='text-3xl font-bold text-gray-900'>₹{product.price}</div>
                    </div>
                </div>
            </div>


            {/* Delivery Detials */}
            <div className='w-full flex flex-col rounded-lg shadow-lg'>
                <div className='w-full flex gap-4 bg-blue-100 p-6 rounded-md items-center'>
                    <div className='p-2 bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg'>
                        <MapPin className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold text-gray-900'>Delivery Address</span>
                </div>


                  <form className='w-full p-4 flex flex-col gap-4'>
                      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='flex flex-col gap-2'>
                            <div className='flex gap-2 items-center'>
                                <User size={16} className='text-gray-700'/>
                                <span className='text-sm font-semibold text-gray-700'>Full Name *</span>
                            </div>
                              
                              <input
                                  type="text"
                                  placeholder="Enter your full name"
                                  className='border-2 border-gray-200 p-3 rounded-md'
                                  
                              />
                          </div>

                          <div className='flex flex-col gap-2'>
                              <div className='flex gap-2 items-center'>
                                <Phone size={16} className='text-gray-700'/>
                                <span className='text-sm font-semibold text-gray-700'>Phone Number *</span>
                                </div>
                              <input
                                  placeholder="Enter phone number"
                                  className='border-2 border-gray-200 p-3 rounded-md'
                              />
                          </div>
                      </div>

                      <div className='w-full flex flex-col gap-2'>
                            <span className='text-sm font-semibold text-gray-700'>Nearby Hostel *</span>
                            <input
                            placeholder="Enter nearby hostel to the delivery location"
                            className='border-2 border-gray-200 p-3 rounded-md'
                              />
                        </div>


                      <div className='w-full flex flex-col gap-2'>
                            <span className='text-sm font-semibold text-gray-700'>Complete Address *</span>
                            <textarea name="" 
                            id=""
                            placeholder='Nearby hostel or landmark or location'
                            className='w-full border-2 border-gray-200 p-3 rounded-md resize-none'
                            rows={3}
                            ></textarea>
                        </div>
                  </form>
            </div>


            
            {/* price Breakdown */}
            <div className='w-full flex flex-col rounded-lg shadow-lg'>
                <div className='w-full flex gap-4 bg-green-100 p-6 rounded-md items-center'>
                    <div className='p-2 bg-gradient-to-r from-teal-500 to-teal-800 rounded-lg'>
                        <IndianRupee className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold text-gray-900'>Price Breakdown</span>
                </div>

                <div className='w-full p-4 flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between mr-4'>
                            <span className='text-sm font-light text-gray-600'>Item Price</span>
                            <span className='text-md font-semibold text-gray-900'>₹{product.price}</span>
                        </div>

                        <div className='flex justify-between mr-4'>
                            <span className='text-sm font-light text-gray-600'>Delivery Charges</span>
                            <span className='text-md font-semibold text-gray-900'>₹0</span>
                        </div>
                        <div className='flex justify-between mr-4'>
                            <span className='text-sm font-light text-gray-600'>Convinence Charges</span>
                            <span className='text-md font-semibold text-gray-900'>₹10</span>
                        </div>
                    </div>

                    <div className='flex justify-between px-4 py-4 border-1 border-gray-300 rounded-md bg-gray-50'>
                        <span className='text-lg font-bold text-gray-950'>Total Amount</span>
                        <span className='text-xl font-bold text-teal-900'>₹{product.price + deliveryCharge + ConvinenceCharge}</span>
                    </div>

                </div>

            </div>


            {/* delivery information */}
            <div className='w-full flex flex-col bg-gradient-to-r from-blue-100 to-sky-100 p-6 rounded-lg shadow-lg gap-4'>
                <div className='flex items-center gap-4'>
                    <div className='p-2 bg-gradient-to-r from-blue-700 to-sky-500 rounded-md'>
                        <Truck className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold text-gray-900'>Delivery Information</span>
                </div>
                <span className='text-[13.5px] font-light text-gray-500'>Expected delivery in 3-5 business days. You will receive tracking details after payment confirmation.</span>
            </div>


            {/* secure payment */}
            <div className='w-full flex justify-center items-center bg-green-100 p-4 rounded-lg shadow-lg '>
                <Shield className='text-green-500'/>
                <span className='text-sm font-semibold text-green-500 ml-3'>Secure Payment </span>
                <span className='text-sm font-semibold text-gray-500 ml-1'> powered by Razorpay</span>
            </div>


            {/* buttons */}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <button className='border-2 border-gray-200 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50'>Cancel</button>
                <PaymentBtn amount={product.price + deliveryCharge + ConvinenceCharge}/>
                <button className='flex justify-center items-center gap-3 border-2 border-gray-200 px-4 py-3 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-800 '>
                    <CreditCardIcon size={18} className='text-white'/>
                    <span className='text-md font-semibold text-white'>Proceed to payment</span>
                </button>
            </div>

        </div>
    </div>
  )
}

export default OrderSummary