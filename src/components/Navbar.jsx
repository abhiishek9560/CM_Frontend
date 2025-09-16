import React, { useContext, useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import{ Plus, Settings, User, Home, Search, Package, MessageCircle, LogOut } from 'lucide-react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';


const Navbar = () => {
    const navigate = useNavigate();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    // const [user, setUser] = useState(null);
    const dropdownRef = useRef();
    const {user, setUser} = useContext(UserContext);
    const API_URL = import.meta.env.VITE_API_URL;



    //fetching user and its details
    // useEffect(()=>{

    //     const fetchUser = async()=>{
    //         try{
    //             const response = await axios.get("http://localhost:3000/user/user-details", {withCredentials:true});
    //             console.log(response.data);
    //             setUser(response.data.user);
    //             setIsLoggedIn(true);
    //         }
    //         catch(error){
    //             console.log(error.message);
    //         }
    //     }
    //     fetchUser();
    // }, []);


    // handle outside click
    useEffect(() => {
        const handleOutsideClick = (event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setProfileDropdown(false);
            }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    
    }, []);

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Browse Items', path: '/products-hub', icon: Search },
        { name: 'Sell Item', path: `${user? ("/dashboard"): ("/login")}`, icon: Plus },
        { name: 'Dashboard', path: `${user? ("/dashboard"): ("/login")}`, icon: User },
        { name: 'Admin', path: '/admin', icon: Settings },
    ];

    async function handleLogout(){
        console.log("clicked")
        try{
            const response = await axios.post(`${API_URL}/user/logout`, {}, {withCredentials:true});
            console.log(response.data);
            setUser(null);
            // setIsLoggedIn(false);
            navigate("/");
        }catch(error){
            console.log(error.message|| error.response?.message);
        }
    };
    

  return (
    <div className='bg-white px-8 max-w-screen shadow-lg sticky top-0 z-50 h-16 flex justify-around items-center '>
        {/* Logo */}
        <Link to="/">
        <div className='flex items-center justify-center space-x-2'>
            <div className='h-8 w-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex justify-center items-center'>
                <span className='font-bold text-white text-sm'>CM</span>
            </div>
            <span className='font-bold text-xl text-gray-800'>CollegeMarket</span>
        </div>
        </Link>
        


        {/* Links */}
        <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item)=> (
                <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                    location.pathname === item.path 
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}>
                    <div className={`flex justify-center items-center gap-2 ${item.name === "Admin" && user?.role !== "admin" ? ('hidden') : ('')}`}>
                        {item.icon && <item.icon size={16}/>}
                    <span >{item.name}</span>
                    </div>
                  
                    
                </Link>
            ))}
        </div>

          {user ? (

              <div className='relative' ref={dropdownRef}>
                  <div onClick={() => setProfileDropdown((prev) => !prev)} className='h-10 w-10 flex justify-center items-center p-1 hover:bg-gray-200 cursor-pointer rounded-full transition-colors'>
                      <img className='object-cover rounded-2xl ' src="https://github.com/shadcn.png" alt="AB" />
                  </div>
                  {profileDropdown && (
                      <div className='absolute -right-30 mt-0 mr-30 py-2 rounded-md  bg-white flex flex-col border-2 border-gray-200 w-56'>
                          <div className='flex flex-col justify-center px-4 border-b-1 border-gray-200 pb-2 '>
                              <span className='text-lg font-semibold m-0 p-0'>{user.name}</span>
                              <span className='text-sm text-gray-500'>{user.email}</span>
                          </div>


                          <div className='flex flex-col items-start px-1 py-2 gap-1 mt-1 border-b-1 border-gray-200 pb-2 '>
                              <button className='pl-2 h-6 w-full flex gap-2 items-center hover:bg-blue-100 rounded-sm'>
                                  <User size={16} />
                                  <span className='text-sm'>Profile</span>
                              </button>
                              <button className='pl-2 h-6 w-full flex gap-2 items-center hover:bg-blue-100 rounded-sm'>
                                  <Package size={16} />
                                  <span className='text-sm'>My Items</span>
                              </button>
                              <button className='pl-2 h-6 w-full flex gap-2 items-center hover:bg-blue-100 rounded-sm'>
                                  <MessageCircle size={16} />
                                  <span className='text-sm'>Messages</span>
                              </button>
                              <button className='pl-2 h-6 w-full flex gap-2 items-center hover:bg-blue-100 rounded-sm'>
                                  <Settings size={16} />
                                  <span className='text-sm'>Settings</span>
                              </button>
                          </div>
                          <div className='flex flex-col items-start px-2 pt-1'>
                              <button onClick={handleLogout} className='pl-2 h-6 w-full flex gap-2 items-center hover:bg-blue-100 rounded-sm'>
                                  <LogOut size={14} className='text-red-500' />
                                  <span className='text-red-500'>Logout</span>
                              </button>
                          </div>
                      </div>
                  )}

              </div>
          )
              :
              (
                  <div className='flex items-center space-x-2'>
                      <button onClick={() => navigate('/login')} className='text-sm font-medium bg-white hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer'>Login</button>
                      <button onClick={() => navigate('/signup')} className='text-sm font-medium text-white bg-black hover:bg-gray-900 px-4 py-2 rounded-md cursor-pointer'>Sign Up</button>
                  </div>
              )}

        {/* search and buttons */}
        {/* {isLoggedIn ?
            (
            <div ref={dropdownRef} onClick={()=> setProfileDropdown(!profileDropdown)} className='h-10 w-10 flex justify-center items-center p-1 hover:bg-gray-200 cursor-pointer rounded-full transition-colors'>
                <img className='object-cover rounded-2xl ' src="https://github.com/shadcn.png" alt="AB" />
            </div>
            )
            :
            (<div className='flex items-center space-x-2'>
            <button onClick={() => navigate('/login')} className='text-sm font-medium bg-white hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer'>Login</button>
            <button onClick={() => navigate('/signup')} className='text-sm font-medium text-white bg-black hover:bg-gray-900 px-4 py-2 rounded-md cursor-pointer'>Sign Up</button>
        </div>
        )} */}

     


     
        
    </div>
  )
}

export default Navbar









