import axios from 'axios';
import { Camera, FileText, Tag, Upload, X, XCircle } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SellItems = () => {


    const navigate = useNavigate();
    const {register, handleSubmit, setValue, reset} = useForm();
    const {user,setUser} = useContext(UserContext);
    const API_URL = import.meta.env.VITE_API_URL;

    const handleFormSubmit = async(data, e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("description", data.description);
        
        // for(let i=0; i<data.images.length; i++){
        //     formData.append("images", data.images[i]);
        //     console.log(data.images[i]);
        // }

        images.forEach(file => {
            formData.append("images", file);
            console.log(file);
        })
        

        try{
            const response = axios.post(`${API_URL}/market/list-prod`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(response)
            reset()
            navigate("/products-hub");
            toast.success("product uploaded");

        }catch(error){
            console.log(error.message);
        }
    };

    // const handleUserStatsUpdate = async() =>{
    //     try{
    //         const response = await axios.put("http://localhost:3000/user/user-stat-update", {
    //             totalListings:(user.totalListings)+1
    //         },
    //         {withCredentials:true});

    //         console.log(response.data);
    //         setUser(response.data.user);


    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // image upload
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || []);
        setImages(prev => [...prev, ...files].slice(0,5));
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    // form submission handling
    

  return (
    <div className='w-full flex flex-col justify-center items-center py-8 gap-6'>

        {/* heading */}
        <div className='w-full flex flex-col justify-center items-center gap-2'>
            <span className='text-2xl font-bold'>List Your Item</span>
            <span className='text-md font-normal text-gray-600'>Share what you no longer need with fellow students</span>
        </div>

        {/* all form fill ups */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className='w-full flex flex-col items-center gap-8'>

            {/* Item Details */}
            <div className='w-[65%] flex flex-col bg-gradient-to-r from-blue-50 to-indigo-50 py-8 px-6 rounded-lg shadow-lg gap-4'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg bg-blue-500'>
                        <Tag size={20} className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold text-gray-900'>Item Details</span>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div htmlFor="itemTitle" className='text-sm font-medium text-gray-700'>Item Title *</div>
                        <input 
                        id='itemTitle'
                        type="text"
                        placeholder='e.g. Iphone 15 Pro - Excellent condition'
                        className='w-full bg-white h-10 border-1 border-gray-300 pl-3 text-md font-light rounded-md'
                        {...register('title', {
                            required: true
                        })}/>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <div htmlFor="price" className='text-sm font-medium text-gray-700'>Price (₹) *</div>
                            <input 
                            id='price'
                            type="number"
                            placeholder='0.00'
                            min={0}
                            step={1}
                            className='w-full bg-white h-10 border-1 border-gray-300 px-3 text-md font-light rounded-md focus:border-blue-500 transition-colors duration-200' 
                            {...register('price', {
                                required: true,
                            })}/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-sm font-medium text-gray-700'>Category *</div>
                            <select 
                            className='w-full bg-white h-10 border-1 border-gray-300 pl-3 text-md font-light rounded-md'
                            {...register('category', {
                                required:true,
                            })}>
                                <option value="">Choose a category</option>
                                <option value="Electronics">💻 Electronics</option>
                                <option value="Vehicles">🪑Vehicles</option>
                                <option value="Textbooks">📚 Textbooks</option>
                                <option value="Sports">⚽ Sports</option>
                                <option value="Clothing">👕Clothing</option>
                                <option value="Other">📦Other</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>


            {/* Description */}
            <div className='w-[65%] flex flex-col bg-gradient-to-r from-green-50 to-emerald-50 py-8 px-6 rounded-lg shadow-lg gap-4'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg bg-blue-500'>
                        <FileText size={20} className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold text-gray-900'>Description</span>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='text-sm font-medium text-gray-700'>Describe your item *</div>
                    <textarea
                    rows={5}
                    placeholder='Provide details about condition, features, reason for selling, and any other relevant information that would help buyers...'
                    className='bg-white border-1 border-gray-200 rounded-lg resize-none focus:border-green-500 transition-colors p-3 text-sm text-gray-600'
                    {...register('description', {
                        required:true,
                    })}></textarea>
                    <span className="text-sm text-gray-500 mt-2">Be honest about the condition and include any flaws or wear</span>
                </div>
            </div>

            {/* upload photos */}
            <div className='w-[65%] flex flex-col bg-gradient-to-r from-purple-50 to-pink-50 py-8 px-6 rounded-lg shadow-lg gap-4'>
                
                {/* heading */}
                <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg bg-purple-500'>
                        <Camera size={20} className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold text-gray-900'>Photos</span>
                </div>

                {/* input box */}
                <div onClick={() => fileInputRef.current?.click()} className='flex flex-col justify-center items-center w-full h-40 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <div className='p-3 bg-purple-500 rounded-full mb-3'>
                            <Upload size={20} className='text-white'/>
                        </div>
                        <span className="text-lg font-medium text-purple-700 mb-1">Upload Photos</span>
                        <span className="text-sm text-purple-500">Click to add up to 5 images</span>
                        <span className="text-xs text-purple-400 mt-1">JPG, PNG, GIF up to 10MB each</span>
                    </div>
                    <input 
                    type="file"
                    name="images"
                    multiple
                    accept='image/*'
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) =>{ handleImageUpload(e);
                                     setValue("images", e.target.files);
                    }} 
                    required
                    />
                </div>


                {/* images */}
                {images.length > 0 && (
                    <div className='grid grid-cols-5 gap-5'>
                        {images.map((file, index) => (
                            <div key={index} className='relative group'>
                                <img 
                                src={URL.createObjectURL(file)} 
                                alt={`Upload ${index + 1}`} 
                                className='w-full sm:h-16 md:h-20 lg:h-32 object-cover rounded-xl shadow-md'
                                />

                                <button
                                type='button'
                                onClick={() => removeImage(index)} className='absolute -top-2 -right-2 rounded-full bg-red-500 text-white p-2 cursor-pointer hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-100'>
                                    <X size={14}/>
                                </button>

                                <div className='absolute bottom-0 left-0 text-gray-300 text-xs mb-2 ml-3'>
                                    {index === 0 ? 
                                    (<span>Main</span>)
                                    :
                                    (<span>Photo {index + 1}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
            </div>
            
            {/* submit button */}
            <div className='flex flex-col justify-center items-center gap-2'>
                <button onClick={()=> handleFormSubmit} type='submit' className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-14 py-2 text-lg text-white font-medium rounded-md cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-110 duration-100'>
                    List Item for Sale
                </button>
                <p className='text-sm text-gray-600 mt-0'>Your listing will be reviewed and published in some time</p>
            </div>    
        </form>
    </div>
  )
}

export default SellItems