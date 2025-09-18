import axios from 'axios';
import { Calendar, Clock, IndianRupee, MapPin, MessageCircle, Phone, QrCode, Shield, ShoppingBag, ShoppingBasket, ShoppingCart, Timer, Truck, Turtle, Upload, User, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary';
import toast from 'react-hot-toast';
import QRModel from '../components/QRModel';
import PaymentBtn from '../components/PaymentBtn';
import { UserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';

const ProductDetail = () => {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    // const location = useLocation();
    // const product = location.state?.props;
    const [selectedImage, setSelectedImage] = useState(0);
    const [orderSummary, setOrderSummary] = useState(null);
    const [product, setProduct] = useState(null);
    const {product_id} = useParams();
    const date = new Date(product?.createdAt).toLocaleString().split(',')[0];
    const [imageSrc, setImageSrc] = useState(product?.image[0]);
    const [QR, setQR] = useState(null);
    const [seller, setSeller] = useState(null);

    const {user} = useContext(UserContext);

    const [deliveryAddress, setDeliveryAddress] = useState({
        name: "",
        number: "",
        nearbyHostel:"",
        completeAddress: "",
    });

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchSellerInfo = async()=>{
        try{
            const seller_id = product.seller;
            const response = await axios.get(`${API_URL}/user/get-seller`, {
                params:{seller_id}
            });
            console.log(response.data);
            setSeller(response.data.seller);
        }catch(error){
            console.log(error.message);
        }
    };

    useEffect(()=>{
        fetchSellerInfo();
    },[product])

    const fetchProductDetails = async()=>{
        
        try{
            const response = await axios.get(`${API_URL}/market/get-product`, {
                params:{product_id}
            });
            console.log(response.data);
            setProduct(response.data.product);
        }catch(error){
            console.log(error.message);
        }
    };

    
    useEffect(() => {
      fetchProductDetails();
    }, [product_id]);

    useEffect(()=>{
        if(product?.image?.length > 0){
            setImageSrc(product?.image[0]);
            // setSelectedImage(0);
        }
    },[product]);



    const handleBuyNowClick = async ()=>{
        if(user){
            setOrderSummary(true);
        }else{
            navigate("/login");
        }
        
        console.log(orderSummary);
    };

    const handleShareLink = async ()=>{
        const productURL = window.location.href;
        navigator.clipboard.writeText(productURL);
        toast.success("Product Link Copied");
    };

    const handleShareQR = async()=>{
        setQR(!QR);
    };

    const handleChange = async(e)=>{
        setDeliveryAddress({...deliveryAddress, [e.target.name]: e.target.value});
    };

    const deliveryCharge = 0;
    const ConvinenceCharge = Math.round(product?.price*0.03);
    
  return (

    // <div>
    //     {product?.title}
    // </div>
    <div className='relative w-[83%] ml-32 flex p-6 gap-8 mt-10 bg-white shadow-2xl rounded-md '>

        {/* image */}
        <div className='w-[35%] h-fit mt-8 flex flex-col gap-4 rounded-sm p-4 border-1 border-gray-200'>
            
            <div className='flex gap-2 '>
                <div className='flex flex-col  gap-2'>
                    {product?.image.map((image, index) => (
                    <div key={index} className='w-fit flex flex-col gap-2 hover:scale-105 h-fit transition-all duration-100 '>
                        <img src={image} 
                        alt="" 
                        className={`h-15 w-15 cursor-pointer rounded-md border-2
                            ${selectedImage === index ?
                                ' border-blue-600':
                                ' border-gray-400'
                             }

                            }`}
                        onClick={()=> {setImageSrc(image), setSelectedImage(index)}}/>
                    </div>
                ))}
                </div>
                
                <div className='w-full h-[400px] '>
                    <img src={imageSrc} 
                     alt="product-image" 
                     className='w-full h-full object-cover rounded-md  hover:scale-102 transition-all duration-200'
                     />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <button onClick={handleBuyNowClick} className='flex justify-center items-center gap-2 bg-gradient-to-r from-green-700 to-teal-700 p-3 border-1 border-gray-300 rounded-lg text-sm font-semibold text-white hover:from-green-800 hover:to-teal-800 cursor-pointer transition-all duration-200'>
                    <ShoppingCart size={18}/>
                    <span>Buy Now</span>
                </button>
                <button className='flex justify-center items-center gap-2 p-3 border-1 border-gray-300 rounded-lg text-sm font-semibold text-gray-800 cursor-pointer hover:bg-gray-100 transition-all duration-200'>
                    <MessageCircle size={16}/>
                    <span>Chat with Seller</span>
                </button>
            </div>
        </div>



        {/* product-details */}
        <div className='w-[60%] flex flex-col gap-6 px-2 py-6 '>


            {/* name and price */}
            <div className='w-full flex flex-col gap-6 p-4 rounded-lg shadow-lg'>
                <div className='w-full flex justify-between items-center px-6'>
                    <span className='text-xl font-semibold text-gray-800'>{product?.title}</span>
                    <div className='flex items-center justify-center font-semibold bg-green-100 px-2 rounded-lg'>
                        <span className='text-[12px] text-green-900'>{product?.status}</span>
                    </div>
                </div>


                <div className='w-full flex justify-between items-center px-6 '>
                    <span className='text-4xl font-bold text-green-900'>₹{product?.price}</span>
                </div>


                <div className='w-full grid grid-cols-1 md:grid-cols-2 px-5 gap-6 mb-4'>
                    <button onClick={handleShareLink} className='flex justify-center items-center px-10 py-2 gap-2 rounded-md border-1 border-gray-300 hover:bg-gray-100 cursor-pointer'>
                        <Upload size={20} className='text-gray-900'/>
                        <span className='text-md font-semibold text-gray-900'>Share Link</span>
                    </button>
                    <button onClick={handleShareQR} className='flex justify-center items-center px-10 py-2 gap-2 rounded-md border-1 border-gray-300 hover:bg-gray-100 cursor-pointer'>
                        <QrCode/>
                        <span className='text-md font-semibold text-gray-900'>QR Code</span>
                    </button>
                </div>
            </div>


            {/* item-details */}
            <div className='flex flex-col px-6 gap-3 p-4 rounded-lg shadow-lg'>
                <span className='text-xl font-semibold text-gray-900'>Item Details</span>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-md font-semibold text-gray-900'>Description</span>
                        <p className='text-[13px] font-semibold text-gray-600'>{product?.description}</p>
                    </div>

                    <div className='h-[1px] bg-gray-200 mt-2'></div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center mr-8 text-sm font-semibold text-gray-900'>
                            <span className='text-md font-semibold text-gray-500'>Category:</span>
                            <span>{product?.category}</span>
                        </div>

                        <div className='flex justify-between items-center mr-8 text-sm font-semibold text-gray-900'>
                            <span className='text-md font-semibold text-gray-500'>Condition:</span>
                            <span>Excellent</span>
                        </div>

                        <div className='flex justify-between items-center mr-8 text-sm font-semibold text-gray-900'>
                            <span className='text-md font-semibold text-gray-500'>Views:</span>
                            <span>15</span>
                        </div>

                        <div className='flex justify-between items-center mr-8 text-sm font-semibold text-gray-900'>
                            <span className='text-md font-semibold text-gray-500'>Listed:</span>
                            <span>{date}</span>
                        </div>
                        
                    </div>
                </div>
                
            </div>


             {/* seller-information */}
            <div className='flex flex-col px-6 gap-3 mt-4 p-4 rounded-lg shadow-lg'>
                <span className='text-xl font-semibold text-gray-900'>Seller Information</span>
                <div className='flex items-center gap-4'>
                    <div className='p-3 text-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-pink-500 rounded-full'>AB</div>
                    <span className='text-lg font-semibold text-gray-900'>{seller?.name}</span>
                </div>

                <span className='text-sm font-normal text-gray-600'>{seller?.bio}</span>

                <div className='flex flex-col items-start gap-4'>
                    <div className='flex justify-center gap-2'>
                        <MapPin size={18} className='text-gray-500'/>
                        <span className='text-sm font-normal text-gray-500'>{seller?.department}, CURAJ</span>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <Calendar size={18} className='text-gray-500'/>
                        <span className='text-sm font-normal text-gray-500'>Joined {seller?.createdAt.slice(0,10)}</span>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <Clock size={18} className='text-gray-500'/>
                        <span className='text-sm font-normal text-gray-500'>Usually responds in 2 hours</span>
                    </div> 
                </div>
            </div>
        </div>












        {/* Order Summary card */}
        {orderSummary &&(
            <>
            <div className="fixed bg-black opacity-70 inset-0 backdrop-blur-sm z-1000">
            </div>

            <div className='fixed w-full inset-0 flex items-center justify-center z-1010 max-h-[90vh] pt-195 overflow-y-scroll'>

                {/* old version */}
                {/* <OrderSummary title={product.title} image={product.image[0]} seller={"Abhishek Kumar"} price={product.price}/>
                <div onClick={()=> setOrderSummary(!orderSummary)} className= 'absolute top-10 right-110 hover:bg-red-500 rounded-full p-1 cursor-pointer'>
                    <X size={12} className='text-white'/>
                </div> */} 
                


                {/* new version */}

                      <div className='w-[50%] flex flex-col justify-center items-center bg-white rounded-lg mb-20'>
                          <div onClick={() => setOrderSummary(!orderSummary)} className='absolute top-10 right-100 hover:bg-red-500 rounded-full p-1 cursor-pointer'>
                              <X size={12} className='text-white' />
                          </div> 
                          <div className='w-full flex flex-col gap-2 px-5 py-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg'>
                              <div className='flex gap-2 items-center'>
                                  <div className='p-2 bg-slate-700 rounded-md'>
                                      <ShoppingBag className='text-white' />
                                  </div>

                                  <span className='text-white text-xl font-semibold'>Order Summary</span>
                              </div>
                              <span className='text-md text-white font-light'>Review your order details and delivery information</span>
                          </div>

                          <div className='w-full p-6 flex flex-col gap-8'>

                              {/* product details */}
                              <div className='w-full flex items-center gap-4 bg-gray-200 rounded-lg'>
                                  <div className='p-4 rounded-lg'>
                                      <img className='h-30 w-35 object-contain rounded-lg' src={product.image[0]} alt="" />
                                  </div>
                                  <div className='w-full flex flex-col gap-3'>
                                      <div className='text-2xl font-bold text-gray-900'>{product.title}</div>

                                      <div className='flex items-center gap-2'>
                                          <User size={16} className='text-gray-700' />
                                          <span><span className='text-gray-700'>Sold by: </span> <span className='text-gray-900 font-semibold'>{"Abhishek Kumar"}</span></span>
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
                                          <MapPin className='text-white' />
                                      </div>
                                      <span className='text-lg font-semibold text-gray-900'>Delivery Address</span>
                                  </div>


                                  <form className='w-full p-4 flex flex-col gap-4'>
                                      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                                          <div className='flex flex-col gap-2'>
                                              <div className='flex gap-2 items-center'>
                                                  <User size={16} className='text-gray-700' />
                                                  <span className='text-sm font-semibold text-gray-700'>Full Name *</span>
                                              </div>

                                              <input
                                                  type="text"
                                                  placeholder="Enter your full name"
                                                  className='border-2 border-gray-200 p-3 rounded-md'
                                                  name='name'
                                                  value={deliveryAddress.name}
                                                  onChange={handleChange}

                                              />
                                          </div>

                                          <div className='flex flex-col gap-2'>
                                              <div className='flex gap-2 items-center'>
                                                  <Phone size={16} className='text-gray-700' />
                                                  <span className='text-sm font-semibold text-gray-700'>Phone Number *</span>
                                              </div>
                                              <input
                                                  placeholder="Enter phone number"
                                                  className='border-2 border-gray-200 p-3 rounded-md'
                                                  name='number'
                                                  value={deliveryAddress.number}
                                                  onChange={handleChange}
                                              />
                                          </div>
                                      </div>

                                      <div className='w-full flex flex-col gap-2'>
                                          <span className='text-sm font-semibold text-gray-700'>Nearby Hostel *</span>
                                          <input
                                              placeholder="Enter nearby hostel to the delivery location"
                                              className='border-2 border-gray-200 p-3 rounded-md'
                                              name='nearbyHostel'
                                              value={deliveryAddress.nearbyHostel}
                                              onChange={handleChange}
                                          />
                                      </div>


                                      <div className='w-full flex flex-col gap-2'>
                                          <span className='text-sm font-semibold text-gray-700'>Complete Address *</span>
                                          <textarea
                                              id=""
                                              placeholder='Nearby hostel or landmark or location'
                                              className='w-full border-2 border-gray-200 p-3 rounded-md resize-none'
                                              rows={3}
                                              name='completeAddress'
                                              value={deliveryAddress.completeAddress}
                                              onChange={handleChange}
                                             
                                          ></textarea>
                                      </div>
                                  </form>
                              </div>



                              {/* price Breakdown */}
                              <div className='w-full flex flex-col rounded-lg shadow-lg'>
                                  <div className='w-full flex gap-4 bg-green-100 p-6 rounded-md items-center'>
                                      <div className='p-2 bg-gradient-to-r from-teal-500 to-teal-800 rounded-lg'>
                                          <IndianRupee className='text-white' />
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
                                              <span className='text-md font-semibold text-gray-900'>₹{ConvinenceCharge}</span>
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
                                          <Truck className='text-white' />
                                      </div>
                                      <span className='text-lg font-semibold text-gray-900'>Delivery Information</span>
                                  </div>
                                  <span className='text-[13.5px] font-light text-gray-500'>Expected delivery in 3-5 business days. You will receive tracking details after payment confirmation.</span>
                              </div>


                              {/* secure payment */}
                              <div className='w-full flex justify-center items-center bg-green-100 p-4 rounded-lg shadow-lg '>
                                  <Shield className='text-green-500' />
                                  <span className='text-sm font-semibold text-green-500 ml-3'>Secure Payment </span>
                                  <span className='text-sm font-semibold text-gray-500 ml-1'> powered by Razorpay</span>
                              </div>


                              {/* buttons */}
                              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                                  <button onClick={() => setOrderSummary(!orderSummary)} className='border-2 border-gray-200 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50'>Cancel</button>
                                  <PaymentBtn productId={product._id} deliveryAddress={deliveryAddress} amount={product?.price + deliveryCharge + ConvinenceCharge}/>
                                  {/* <button className='flex justify-center items-center gap-3 border-2 border-gray-200 px-4 py-3 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-800 '>
                                      <CreditCardIcon size={18} className='text-white' />
                                      <span className='text-md font-semibold text-white'>Proceed to payment</span>
                                  </button> */}
                              </div>

                          </div>
                      </div>
            </div>
            </>
        )}




        {/* QRcode */}
        {QR && (
            <>
            <div className='fixed inset-0 bg-black opacity-70 backdrop-blur-3xl z-1000'>
            </div>

            <div className='fixed w-full inset-0 flex items-center justify-center z-1010'>
                <div onClick={()=>setQR(!QR)} className='absolute top-30 right-142 cursor-pointer p-1 rounded-full hover:bg-gray-200 '>
                    <X size={18}/>
                </div>
                <QRModel url={product?.qr.url} link={window.location.href}/>
            </div>
            </>
        )}
    </div>
  )
}

export default ProductDetail