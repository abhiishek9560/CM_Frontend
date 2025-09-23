import React from 'react'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import ProductListCard from './ProductListCard';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  const {user} = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  

  useEffect(()=>{
    if(!user?._id) return;

    // axios.get(`http://localhost:3000/user/totalListings/${user._id}`, {withCredentials:true})
    axios.get(`${API_URL}/user/totalListings/${user._id}`, {withCredentials:true})
    .then((res)=>{
      setProducts(res.data.products);
      console.log(res.data);
    })
    .catch((error)=>{
      console.log("Error fetching user listings", error)
    })
  }, [user]);


  
  return (
    <div className='w-full flex flex-col items-start py-6 px-8 gap-6 mb-4 '>
      <div className='flex flex-col gap-2'>
        <span className='text-2xl font-bold text-black'>My Listings</span>
        <span className='text-md font-normal text-gray-500'>Manage your active and sold items</span>
      </div>

      {user? (
        <div className='grid grid-cols-4 gap-8'>
          {products.map((product)=>(
            <ProductListCard key={product._id} product_id={product._id} title={product.title} description={product.description} category={product.category} price={product.price} image={product.image} status={product.status} seller={product.seller} createdAt={product.createdAt}/>
          ))}
          </div>
        )
        :
        (<p>Hiiii, no user there</p>)}

        <div className='w-full flex justify-center items-center'>
          {products.length === 0? (<div className='w-full flex flex-col gap-3 justify-center items-center border-1 border-gray-200 rounded-lg p-6 bg-gray-50'>
            <span className='text-7xl'>🔍</span>
            <span className='text-xl font-medium text-gray-800'>You haven't listed any product</span>
            <button onClick={()=>navigate("/products-hub")} className='flex gap-2 justify-center items-center px-8 border-1 border-gray-300 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-950 hover:scale-105 transition-all duration-150 cursor-pointer '>
              <Upload className='text-white'/>
              <span className='text-md font-medium text-white'>List your product</span>
            </button>
          </div>): (<p></p>)}
        </div>
    </div>
  )
}

export default MyListings