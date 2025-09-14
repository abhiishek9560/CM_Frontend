import axios from 'axios'
import { ArrowRight, Hand, Lock, Mail, ShoppingBag } from 'lucide-react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const {register, handleSubmit, reset} = useForm();
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

  const API_URL = import.meta.env.VITE_API_URL;


  const handleFormSubmit = async(data)=>{

    try{
      const response = await axios.post(`${API_URL}/user/signin`, data, {withCredentials:true});
      console.log(response.data);
      //updating user details just after login
      const userRes = await axios.get(`${API_URL}/user/user-details`, {withCredentials:true});
      setUser(userRes.data.user);
      // setUser(response.data);
      toast.success("Sign In Successfull");
      reset();
      navigate("/");
      
    }catch(error){
      // console.error("user login failed:", error.response?.data || error.message);
      // toast.error("")
      if(error.response){
        if(error.response.status === 400){
          toast.error("Invalid Credentials");
        }
      }
    }
  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8 relative overflow-hidden'>
      {/* background */}
      <div className='absolute inset-0 opacity-40'>
        <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-green-400 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400  rounded-full blur-3xl'></div>
        <div className='absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-blue-300 to-green-300 rounded-full blur-2xl'></div>
      </div>

      {/* whole */}
      <div className='w-full max-w-md relative z-10 '>
        {/* Logo */}
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-gradient-to-r from-blue-500 to-green-500 text-white w-16 h-16 flex justify-center items-center rounded-2xl mb-4 shadow-lg'>
            <ShoppingBag size={28}/>
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-green-600 to to-blue-600 text text-transparent bg-clip-text'>CollegeMarket</h1>
        </div>


        {/* Card */}
        <div className='shadow-2xl border-0 bg-white/80 backdrop-blur-xl relative overflow-hidden rounded-xl'>

          {/* green-line */}
          <div className='w-full h-1 bg-gradient-to-r from-green-500 to-blue-500'></div>


          {/* cardTitle */}
          <div className='flex flex-col justify-center items-center mt-6'>
            <span className='text-3xl font-bold'>Welcome Back</span>
            <span className='text-md text-gray-600 mt-2.5'>Sign in to your account to continue shopping</span>
          </div>


          {/* inputs */}
          <div className='space-y-4 mt-6 px-8 pb-8 '>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col space-y-4'>

              {/* email */}
              <div className='grid grid-cols-1 justify-center items-center space-y-2'>
                <div htmlForm='email' className='flex items-center gap-2 text-sm font-semibold text-gray-700  '>
                  <Mail size={16}/>
                  <span>Email Address</span>
                </div>
                <input 
                type="text"
                placeholder='Enter your email'
                className='h-12 w-full pl-4 border-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-900 placeholder:text-gray-500'
                required 
                {...register('email', {required:true})}/>
              </div>

              {/* password */}
              <div className='grid grid-cols-1 space-y-2
              '>
                <div className='flex items-center justify-between' >
                  <div htmlForm='password' className='flex items-center gap-2 text-sm font-semibold text-gray-700  '>
                    <Lock size={16}/>
                    <span>Password</span>
                  </div>

                  <Link to="" className='text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200'>Forget Password? </Link>
                </div>

                <input
                id='password' 
                type="password"
                placeholder='Enter your password'
                className='h-12 w-full pl-4 border-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-900 placeholder:text-gray-500'
                required 
                {...register('password', {required:true})}/>
              </div>

              <button className='mt-2 h-12 w-full rounded-xl space-x-2 flex justify-center items-center bg-gradient-to-r from bg-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 cursor-pointer text-white text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] font-semibold '>
                <span>Sign In</span>
                <ArrowRight size={20}/>
              </button>
            </form>

            {/* or line */}

                    <div className='flex flex-col justify-center items-center space-y-6 mt-6'>
                        <div className='flex justify-center items-center w-full space-x-4'>
                            <div className='w-[44%] border-1 border-gray-200 '></div>
                            <span className='text-gray-500 text-sm font-semibold'>or</span>
                            <div className='w-[44%] border-1 border-gray-200'></div>
                        </div>

                        <p className="text-sm text-gray-600">
                            Don't have an account{' '}
                            <Link
                                to="/signup"
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                            >
                              Create one now
                            </Link>
                        </p>

                        
                    </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login