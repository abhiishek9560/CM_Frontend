import axios from 'axios';
import { User } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const ProductListCard = (props) => {
    const [seller, setSeller] = useState('');
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const API_URL = import.meta.env.VITE_API_URL;
    
    const checkStatus= (status)=>{
        if(status === "Available"){
            return 'bg-green-100 text-green-800 border-green-200';
        }
        else if(status === "Reserved"){
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        }
        else if(status === "Sold"){
            return "bg-red-100 text-red-800 border-red-200"
        }
    };

    const checkShadowColor = (status) => {
        if(status === "Available"){
            return "hover:shadow-green-900"
        }
        else if( status === "Reserved"){
            return "hover:shadow-yellow-900"
        }
        else if(status === "Sold"){
            return "hover:shadow-red-900"
        }
    };

    const handleCardClick = () => {
        navigate(`/product-detail/${props.product_id}`, {
            state:{props}
        })
    
    }

    useEffect(() => {
        const fetchSellerName = async() =>{
            
            try{
                const response = await axios.get(`${API_URL}/user/get-seller-name?query${props.seller}`);
                setSeller(response.data);
            }catch(error){
                console.log(error.message);
            }
        }
        fetchSellerName();
    }, [props.seller])
    
  return (
    <div onClick={handleCardClick} className={`flex flex-col bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl relative transform transition-all hover:scale-105 hover:-translate-y-3 duration-400 ${checkShadowColor(props.status)}`}>
        {/* image */}
        <div className='h-[200px]'>
            <img className='rounded-t-lg object-cover h-full w-full' src={props.image[0]} 
            alt="Image" />
        </div>

        {/* other details */}
        <div className='flex flex-col gap-2 p-4'>
            <div className='text-md font-bold '>
                {props.title}
            </div>
            <div className='text-2xl font-bold text-blue-700'>
                ₹{props.price}
            </div>
    
            <div className='text-[14px] font-light text-gray-700'>
                <p>{props.description.length < 80 ? (props.description) : (props.description.split(" ").slice(0, 11).join(" ") + "...")}</p>
            </div>

            <div className='w-full bg-gray-100 h-[0.5px]'>

            </div>
            <div className='flex justify-between '>
                <div className='text-sm text-gray-500'>
                    by {seller}
                </div>
                <div className='text-sm text-gray-500 bg-gray-100 rounded-md px-2 py-0.1'>
                    {props.category}
                </div>
            </div>

            <div className={`absolute flex justify-center items-center top-4 right-4  text-[13px] font-semibold py-0.5 px-3 border-1 rounded-full ${checkStatus(props.status)}`}>
                {props.status}
            </div>
            
            
        </div>
    </div>
  )
}

export default ProductListCard