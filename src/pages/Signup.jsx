import { ArrowLeft, ArrowRight, Axis3DIcon, Building, Building2, CheckCircle, LockIcon, Mail, Shield, ShoppingBag, User, UserCheck } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast'

const Signup = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    // input and form states
    const {register, handleSubmit, reset, setValue, formState:{errors}} = useForm();
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    
    // otp
    const inputRefs = useRef([]);
    // const [otp, setOtp] = useState(new Array(6).fill(''));
    const [activeIndex, setActiveIndex] = useState(0);

    // user signup and otp
    const [userData, setUserData] = useState(null);
    const [OTP, setOTP] = useState(new Array(6).fill(''));

    // submitting the input user data for OTP
    const handleFormSubmit = async(data, e)=>{
        e.preventDefault();
        setUserData(data);
        try{
            const response = await axios.post(`${API_URL}/user/send-otp`, {email: data.email});
            console.log(response.data);
            setShowOtpVerification(true);
            toast.success("OTP sent to email");
            console.log(userData);
          
            
        }catch(error){
            console.log(error.response?.data || error.message);
        }
    }

    // submitting the otp with form data to store user
    const handleOTPSubmit = async(data)=>{

        try{
            console.log(data);
            const userDataWithOTP = {...userData, otp: data.otp};
            const response = await axios.post(`${API_URL}/user/signup`, userDataWithOTP);
            console.log(response.data);
            toast.success("Signup successfull");
            reset();
            navigate("/login");
            

        }catch(error){
            console.log(error.response?.data || error.message);
        }
    }

    // Back buton
    const handleBackToForm = ()=>{
        setShowOtpVerification(false);
    }

    // otp functionalities
    const handleChange = (e, index)=>{
        const value = e.target.value.replace(/[^0-9]/g, '');
        if(!value) return;
        const newOtp = [...OTP];
        newOtp[index] = value[0];
        setOTP(newOtp);
        setValue("otp", newOtp.join(""));

        
        if(index < 5){
            inputRefs.current[index +1].focus();
            // setActiveIndex(index + 1);
        }
    };

    const handleKeyDown = (e, index)=>{
        if(e.key === 'Backspace'){
            e.preventDefault();
            const newOtp = [...OTP];
            newOtp[index] = '';
            setOTP(newOtp);
            setValue("otp", newOtp.join(""));

            if(index > 0 ){
                inputRefs.current[index - 1].focus();
                // setActiveIndex(index - 1);
            }
            else if(e.key === 'ArrowLeft' && index > 0 ){
                inputRefs.current[index - 1].focus();
                // setActiveIndex(index - 1);
            }
            else if(e.key === 'ArrowRight' && index < 5){
                inputRefs.current[index + 1].focus();
                // setActiveIndex.current[index + 1];
            }
        }};

        const handlePaste = (e)=>{
            e.preventDefault();
            const pasted = e.clipBoardData.getData('text').slice(0,6).split('');
            const newOtp = [...OTP];
            pasted.forEach((char, i) => {
                if(i < 6) newOtp[i] = char;
            });
            setOTP(newOtp);
            setValue("otp", newOtp.join(""));

            if(pasted.length < 6){
                inputRefs.current[pasted.length]?.focus();
                // setActiveIndex(pasted.length);
            } 
            else{
                inputRefs.current[5].blur();
            }
        };


        const handlePasswordChange = ()=>{
            
        }

        



  return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8 relative overflow-hidden'>
          {/* background */}
          <div className="absolute inset-0 opacity-40">
              <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-green-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl"></div>
              <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-blue-300 to-green-300 rounded-full blur-2xl"></div>
          </div>

          {/* Whole */}
          {!showOtpVerification ?(
            <div className='w-full max-w-lg relative z-10'>
               {/* Logo */}
              <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-4 shadow-lg">
                      {showOtpVerification ? <Shield size={28} className="text-white" /> :<ShoppingBag size={28} className="text-white" /> }
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      CollegeMarket
                  </h1>
              </div>

                {/* Card */}
              <div className='w-full shadow-2xl border-0 bg-white/80 backdrop-blur-xl relative overflow-hidden rounded-2xl'>
                
                {/* green-line */}
                <div className='w-full bg-gradient-to-r from-blue-500 to-green-500 h-1'></div>
                
                {/* cardTitle */}
                <div className='flex flex-col justify-center items-center mt-6'>
                    <span className='text-3xl font-bold'>Create Account</span>
                    <span className='text-md text-gray-600 mt-2.5'>Join your college marketplace community</span>
                </div>

                {/* input-box */}

                <div className='space-y-4 mt-6 px-8 pb-8'>
                    <form onSubmit={handleSubmit(handleFormSubmit)}  className='flex flex-col  space-y-4'>
                        {/* name and email */}
                        <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center'>
                            <div className='space-y-2'>
                                <div htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User size={16}/>
                                    <span>Full Name</span>
                                </div>
                                <input 
                                id='name'
                                type="text"
                                placeholder='Enter your full name'
                                className='h-12 w-fit pl-4 bg-gray-50/50 border-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-900 placeholder:text-gray-500'
                                required 
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: "Name can't be empty",
                                    } ,

                                    minLength:{
                                        value: 5,
                                        message: "min length 5"
                                    }
                                
                                } )}/>
                                
                            </div>

                            <div className='space-y-2'>
                                <div htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Mail size={16}/>
                                    <span>Email address</span>
                                </div>
                                <input
                                id='email' 
                                type="text"
                                placeholder='your.email@curaj.ac.in'
                                className='h-12 w-full pl-4 bg-gray-50/50 border-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-900 placeholder:text-gray-500'
                                required 
                                {...register('email', {
                                    required: "Email is required",
                            
                                    pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@curaj\.ac\.in$/,
                                            message: "Email must be a valid @curaj.ac.in address"
                                    }
                                    
                                })}/>
                            </div>
                        </div>

                        {/* password */}
                        <div className='space-y-2'>
                            <div htmlFor="password" className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <LockIcon size={16}/>
                                <span>Password</span>
                            </div>
                            <input 
                            id='password'
                            type="password"
                            placeholder='Create a strong password'
                            className='h-12 w-full pl-4 bg-gray-50/50 border-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-900 placeholder:text-gray-500'
                            required 
                            onChange={handlePasswordChange}
                            {...register('password', 
                                { required: "password is manadotry",
                                
                                    validate: {
                                        hasUppercase: (value) =>
                                            /[A-Z]/.test(value) || "should contain atleast one UPPERCASE",
                                        hasSpecialChar: (value) => 
                                            /[\W_]/.test(value) || "should contain atleast one SPECIAL CHARACTER",
                                    },

                                    minLength: {
                                        value: 8,
                                        message: "atleast 8 characters long"
                                    }
                                
                            })}/>
                        </div>

                        {/* role and department */}
                          <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center'>
                              <div className='space-y-2'>
                                  <div className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                      <UserCheck size={16} />
                                      <span className=''>Role</span>
                                  </div>
                                  <select {...register('role', {
                                    required:true
                                  })} 
                                  className='h-12 w-[85%] pl-4 bg-gray-50/50 border-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-900 placeholder:text-gray-500'>
                                      <option value="">Select your role</option>
                                      <option value="student">Student</option>
                                      <option value="faculty">Faculty</option>
                                      <option value="admin">Admin</option>
                                  </select>
                              </div>

                              <div className='space-y-2'>
                                  <div htmlFor='department' className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                      <Building2 size={16} />
                                      <span className=''>Department</span>
                                  </div>
                                  <input
                                      id='department'
                                      type="text"
                                      placeholder='Enter department'
                                      className='h-12 w-full pl-4 bg-gray-50/50 border-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-900 placeholder:text-gray-500' 
                                      {...register('department', {
                                        required:true
                                      })}/>
                              </div>
                          </div>

                                      {/* error messages */}
                                      {errors.name && <div className='flex justify-center items-center m-0 p-0'><span className='text-sm text-red-500 font-light m-0 p-0'>{errors.name.message}</span></div>}
                                      {errors.email && <div className='flex justify-center items-center m-0 p-0'><span className='text-sm text-red-500 font-semibold m-0 p-0'>{errors.email.message}</span></div>}
                                      {errors.password && <div className='flex justify-center items-center m-0 p-0'><span className='text-sm text-red-500 font-semibold m-0 p-0'>{errors.password.message}</span></div>}
                          <button
                          type='submit'
                          className='mt-2 h-12 w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-sm rounded-xl font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] '>
                             <span>Create Account</span><ArrowRight size={16}/>
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
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                            >
                              Sign in here
                            </Link>
                        </p>

                        <div className='bg-blue-50 border-1 border-blue-200 rounded-xl p-4 '>
                            <div className='flex gap-3'>
                                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0"/>
                                <div className='flex flex-col'>
                                    <p className='text-sm font-medium text-blue-900 mb-1'>Email Verification Required</p>
                                    <p className='text-xs text-blue-700'>We'll send a verification email to confirm your account after registration.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

              </div>
          </div>
          )
          :
          (
            <div className='w-full max-w-lg relative z-10'>
               {/* Logo */}
              <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mb-4 shadow-lg">
                      {showOtpVerification ? <Shield size={28} className="text-white" /> :<ShoppingBag size={28} className="text-white" /> }
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      CollegeMarket
                  </h1>
              </div>

                {/* Card */}
              <div className='w-full shadow-2xl border-0 bg-white/80 backdrop-blur-xl relative overflow-hidden rounded-2xl'>
                
                {/* green-line */}
                <div className='w-full bg-gradient-to-r from-blue-500 to-green-500 h-1'></div>
                
                {/* cardTitle */}
                <div className='flex flex-col justify-center items-center mt-6'>
                    <span className='text-3xl font-bold'>Verify Your Email</span>
                    <span className='text-md text-gray-600 mt-2.5'>Enter the 6-digit code sent</span>
                </div>

                {/* input-box */}

                <div className='space-y-4 mt-6 px-8 pb-8'>
                    <form onClick={handleSubmit(handleOTPSubmit)} className='flex flex-col  space-y-4'>
                        
                        <div className='space-y-4'>

                            <div  className="text-sm font-semibold text-gray-700 flex items-center justify-center gap-2">
                                <Shield size={16}/>
                                <span>Verification Code</span>
                            </div>

                            <div className='flex justify-center gap-2'>
                                {OTP.map((digit, index) =>(
                                    <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type='text'
                                    inputMode='numeric'
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    onFocus={() => setActiveIndex(index)}
                                    className={`bg-gray-50 w-12 h-12 text-center text-xl border-1 border-gray-300 rounded-xl outline-none transition  focus:ring-2 focus:ring-black-100`} />
                                ))}
                                <input type="hidden" {...register("otp", {required: true})} />
                            </div>
                        </div>

                        {/* buttons */}
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <button
                            type='submit'
                            disabled={OTP.length !== 6 || isVerifying}
                            className='mt-2 h-12 w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-sm rounded-xl font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none '
                            >
                                {isVerifying?(
                                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'>
                                        Verifying...
                                    </div>
                                ):
                                (
                                    <div className='flex justify-center items-center gap-2'>
                                        Verify & Create Account
                                        <CheckCircle size={18}/>
                                    </div>
                                )}
                            </button>

                            <button
                            type='button'
                            onClick={handleBackToForm}
                            className='h-12 w-full border-2 border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-50'>
                                <ArrowLeft size={16}/>
                                <span>Back to Form</span>
                            </button>
                        </div>

                          {/* <button
                          type='submit'
                          className='mt-2 h-12 w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-sm rounded-xl font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] '>
                             <span>Create Account</span><ArrowRight size={16}/>
                          </button> */}
                    </form>

                    {/* or line */}

                    <div className='flex flex-col justify-center items-center space-y-6 mt-6'>
                        {/* <div className='flex justify-center items-center w-full space-x-4'>
                            <div className='w-[44%] border-1 border-gray-200 '></div>
                            <span className='text-gray-500 text-sm font-semibold'>or</span>
                            <div className='w-[44%] border-1 border-gray-200'></div>
                        </div> */}

                        

                        <div className='bg-green-50 border-1 border-green-200 rounded-xl p-4 w-full '>
                            <div className='flex gap-3'>
                                <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0"/>
                                <div className='flex flex-col'>
                                    <p className='text-sm font-medium text-green-900 mb-1'>Security Notice</p>
                                    <p className='text-xs text-green-700'>This code expires in 10 minutes. Don't share it with anyone.</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{' '}
                            <Link
                                to="/login"
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                            >
                              Resend Code
                            </Link>
                        </p>
                    </div>
                    
                </div>

              </div>
          </div>
          )

          }

      </div>
  )
}

export default Signup