import axios from 'axios';
import { AlertCircle, ArrowRight, Book, BookOpen, Car, Gamepad2, Laptop, Laptop2, Search, ShoppingBag, Sofa, Users } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    useEffect(()=>{
        setAnimate(true);
    },[])
    // const categories = [
    //     {name: 'Textbooks', icon: BookOpen, color: 'from-blue-500 to-blue-600'},
    //     {name: 'Electronics', icon: Laptop, color: 'from-purple-500 to-purple-600'},
    //     {name: 'Furniture', icon: Sofa, color: 'from-green-500 to-green-600' },
    //     {name: 'Vehicles', icon: Car, color: 'from-red-500 to-red-600'},
    //     {name: 'Sports', icon: Gamepad2, color: 'from-orange-500 to-orange-600'}
    // ];

    // const [loggedIn, setLoggedIn] = useState("");
    // const [userName, setUserName] = useState("");
    
    // const getLoggedInUser = async()=>{
    //     try{
    //         const response = await axios.get("http://localhost:3000/user/is-loggedIn", {withCredentials:true});
    //         console.log(response.data);
    //         setLoggedIn(response.data.user);
    //     }catch(error){
    //         console.log(error.message);
    //     }
    // };
    // useEffect(() => {
    //   getLoggedInUser();
    // }, [])
    

    // const getUserName = async()=>{
    //     try{
    //         const response = await axios.get(`http://localhost:3000/user/get-seller-name?query${loggedIn.id}`);
    //         console.log(response.data);
    //         setUserName(response.data);
    //     }catch(error){
    //         console.log(error.message);
    //     }
    // };

    // useEffect(()=>{
    //     getUserName();
    // },[])

  return (

    <div className='mb-0'>

        {/* zeroth box */}
        <div className={`flex justify-around items-center bg-yellow-50 py-4 border-l-6 border-yellow-700
            ${user? '':'hidden'}`}>
            <div className='flex justify-center items-center gap-4'>
                <div className='p-3 bg-yellow-200 rounded-xl'>
                    <AlertCircle size={18} className='text-yellow-600'/>
                </div>
                <div className='flex flex-col items-start'>
                    <span className='text-md font-semibold text-gray-900'>Complete Your Profile</span>
                    <span className='text-sm font-light text-gray-700'>Your profile is 17% complete. Complete it to improve your marketplace presence.</span>
                </div>
            </div>
            <div>
                <button className='text-white bg-yellow-500 text-sm font-semibold px-3 py-2 rounded-md cursor-pointer hover:bg-yellow-600'>
                    Complete Now
                </button>
            </div>
        </div>

        {/* first box */}
        {user ?
         (
            <div className='flex justify-around items-center space-y-8 py-14 bg-gradient-to-r from-blue-500 to-green-500 gap-14 '>

                <div className={`flex flex-col justify-center items-start gap-5 transform transition-transform duration-700 ease-in-out ${animate? 'translate-x-0': '-translate-x-full'} `}>
                    <div className='flex gap-2'>
                        <span className='text-4xl font-bold text-white'>Welcome back, {user.name.split(' ')[0]}! </span><div className='animate-bounce text-4xl'>👋</div>
                    </div>
                    <span className='text-lg font-normal text-white'>Ready to discover great deals or sell your items?</span>

                    <div className='flex justify-center items-center space-x-6'>
                        <button onClick={()=>navigate("/products-hub")} className='flex justify-center items-center space-x-2 border-2 border-white px-6 py-2 bg-white rounded-md cursor-pointer hover:bg-gray-50'>
                            <span className='text-lg  text-blue-500'>Start Shopping</span>
                            <ArrowRight className='text-blue-500' size={16} />
                        </button>
                        <button onClick={()=>navigate("/dashboard")} className='border-2 border-white px-6 py-2 text-lg rounded-md text-white cursor-pointer hover:bg-white hover:text-blue-500 transition-all duration-200'>Sell Your Items</button>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-white/15 border-1 border-white/20 p-5 rounded-lg'>
                    <div className='flex flex-col items-start gap-4 text-md text-white font-bold'>
                        Quick Stats
                    </div>

                    <div className='flex flex-col items-start gap-2 text-gray-200'>
                        <span>Items Listed:     3</span>
                        <span>Items Sold:     12</span>
                        <span>Total Earned: 5999</span>
                    </div>
                </div>
            </div>

         )
         :
         (
            <div className='flex flex-col justify-center items-center space-y-8 py-14 bg-gradient-to-r from-blue-500 to-green-500'>
            
            <span className='text-6xl font-bold text-white'>College Marketplace</span>
            
            <span className='text-2xl font-normal text-white'>Buy and Sell textbooks, electronics, and more within your college community</span>
            
            <div className='flex justify-center items-center space-x-6'>
                <button onClick={()=>navigate("/products-hub")} className='flex justify-center items-center space-x-2 border-2 border-white px-6 py-2 bg-white rounded-md cursor-pointer hover:bg-gray-50'>
                    <span className='text-lg  text-blue-500'>Start Shopping</span> 
                    <ArrowRight className='text-blue-500' size={16}/>
                </button>
                <button onClick={()=>navigate("/dashboard")} className='border-2 border-white px-6 py-2 text-lg rounded-md text-white cursor-pointer hover:bg-white hover:text-blue-500 transition-all duration-200'>Sell Your Items</button>
            </div>
        </div>

         )}
        
        {/* second box */}
        <div className='flex flex-col justify-center items-center space-y-8 py-10'>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-4xl font-bold mb-4'>Why Choose CollegeMarket?</span>
                <span className='text-lg font-normal text-gray-600'>The easiest way to buy and sell items within your college commounity. Safe,</span>
                <span className='text-lg font-normal text-gray-600'>convinient, and designed by a student for student</span>
            </div>

            <div className='flex justify-center items-center space-x-8'>
                {/* Easy Selling */}
                <div className='flex flex-col space-y-2 justify-center items-center border border-gray-200 rounded-md p-6 hover:shadow-lg transition-shadow '>
                    <div className='bg-gradient-to-r from-blue-500 to-green-500 h-16 w-16 rounded-4xl flex justify-center items-center'>
                        <ShoppingBag className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold'>Easy Selling</span>
                    <span className='text-gray-600'>List your items in minutes using simple form</span>
                </div>

                <div className='flex flex-col space-y-2 justify-center items-center border border-gray-200 rounded-md p-6 hover:shadow-lg transition-shadow '>
                    <div className='bg-gradient-to-r from-blue-500 to-green-500 h-16 w-16 rounded-4xl flex justify-center items-center'>
                        <Search className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold'>Smart Search</span>
                    <span className='text-gray-600'>Find exactly what you need with advanced filters</span>
                </div>

                <div className='flex flex-col space-y-2 justify-center items-center border border-gray-200 rounded-md p-6 hover:shadow-lg transition-shadow '>
                    <div className='bg-gradient-to-r from-blue-500 to-green-500 h-16 w-16 rounded-4xl flex justify-center items-center'>
                        <Users className='text-white'/>
                    </div>
                    <span className='text-lg font-semibold'>College Community</span>
                    <span className='text-gray-600'>Buy and sell within your trusted college network</span>
                </div>
            </div>

            {/* Third Box */}
            <div className='flex flex-col justify-center items-center bg-gray-100 w-full mt-8 py-8 mb-0 pb-12'>
                <div className='flex flex-col justify-center items-center pt-8 gap-4'>
                    <span className='text-3xl font-bold'>Browse Categories</span>
                    <span className='text-lg font-normal text-gray-800'>Find what you need quickly in these popular categories</span>
                </div>
                <div className='flex justify-center items-center gap-6 mt-12'>
                    {[
                        {name: 'Textbooks', icon: BookOpen, color: 'from-blue-500 to-blue-600'},
                        {name: 'Electronics', icon: Laptop, color: 'from-purple-500 to-purple-600'},
                        {name: 'Furniture', icon: Sofa, color: 'from-green-500 to-green-600' },
                        {name: 'Vehicles', icon: Car, color: 'from-red-500 to-red-600'},
                        {name: 'Sports', icon: Gamepad2, color: 'from-orange-500 to-orange-600'}
                    ].map((category, index) => (
                        <div key={index}
                        onClick={()=>navigate("/products-hub")}
                        className='flex flex-col justify-center items-center gap-2 py-6 px-20 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 cursor-pointer'>
                            <div className={`p-4 bg-gradient-to-r ${category.color} rounded-xl`}>
                                <category.icon className='text-white'/>
                            </div>
                            <span className="text-center font-semibold text-gray-900">{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Forth Box */}
            {user? (

                <div className='w-full bg-gradient-to-br from-gray-950 to-gray-600 flex flex-col justify-center items-center gap-4 py-16'>
                    <p className='text-3xl font-bold text-white'>You need Something?</p>
                    <p className='text-xl font-normal text-gray-400'>Browse and find what you need from your friends</p>
                    <button className='p-4 bg-gray-300 flex justify-center items-center gap-2 px-8 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200'>
                        <span onClick={()=>navigate("/products-hub")}>Browse Items</span>
                        <ArrowRight size={20}/>
                        
                    </button>
                </div>
            
            ):(
                <div className='w-full bg-gradient-to-br from-gray-950 to-gray-600 flex flex-col justify-center items-center gap-4 py-16'>
                    <p className='text-3xl font-bold text-white'>Ready to Get Started?</p>
                    <p className='text-xl font-normal text-gray-400'>Join thousands of students buying and selling on CollegeMarket</p>
                    <button className='p-4 bg-gray-300 flex justify-center items-center gap-2 px-8 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200'>
                        <span onClick={()=>navigate("/signup")}>Create Your Account</span>
                        <ArrowRight size={20}/>
                        
                    </button>
                </div>
            )}
            <div>
            </div>
        </div>

        
    </div>
  )
}

export default Home