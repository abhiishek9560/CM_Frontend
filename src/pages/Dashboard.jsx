import { MessageCircle, Package, Plus, ShoppingBag, TrendingUp, User } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SellItems from '../components/SellItems';
import MyListings from '../components/MyListings';
import Profile from '../components/Profile';
import Message from '../components/Message';
import Purchased from '../components/Purchased';
import { UserContext } from '../context/UserContext';
import ProtectedRoute from '../components/ProtectedRoutes';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('sell');
    const {user} = useContext(UserContext)

    const userStats = [
        {label: "Total Listings", value: user?.totalListings.length || 0, icon: Package, color: "text-blue-600 bg-blue-100"},
        {label: "Items Sold", value: user?.itemsSold.length || 0, icon: TrendingUp, color: "text-green-600 bg-green-100"},
        {label: "Total Earning", value: user?.totalEarning || 0, icon: ShoppingBag, color: "text-purple-600 bg-purple-100"}
    ]

    const tabs = [
        {id: "sell", label: "Sell Item", icon: Plus, color: "from-green-500 to-emerald-500"},
        {id: "listings", label: "My Listings", icon: Package, color: "from-blue-500 to-cyan-500"},
        {id: "profile", label: "Profile", icon: User, color: "from-purple-500 to-pink-500"},
        {id: "messages", label: "Messages", icon: MessageCircle, color: "from-pink-500 to-red-500"},
        {id: "purchased", label: "Purchased", icon: ShoppingBag, color: "from-indigo-500 to-purple-500"},
    ]
  return (
    <div className='w-[83%] ml-32 flex flex-col items-center gap-8 mt-10 pb-10'>
        
        {/* Dashboard banner */}
        <div className=' bg-white w-full flex flex-col justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-9 px-8 rounded-2xl gap-2 shadow-lg'>
            <span className='text-4xl font-bold text-white'>Dashboard</span>
            <span className='text-[17px] font-semibold text-gray-100'>Manage your listings and account</span>
        </div>

        {/* User stats */}
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
            {userStats.map((stat,index) => (
                <div key={stat.color} className='flex justify-between items-center bg-white px-4 py-6 shadow-lg rounded-lg hover:shadow-2xl'>
                    <div className='flex flex-col items-center gap-3'>
                        <span className='text-sm font-medium text-gray-600'>{stat.label}</span>
                        <span className='text-3xl font-bold text-gray-900'>{stat.value}</span>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                        <stat.icon />
                    </div>
                </div>
            ))}
        </div>

        {/* sell and other options */}
        <div className='w-full bg-white grid grid-cols-2 md:grid-cols-5 gap-4 p-6 rounded-xl shadow-xl backdrop-blur-sm'>
            {tabs.map(tab => (
                <button
                key={tab.id}
                onClick={()=>setSelectedTab(tab.id)}
                className={`relative text-center px-18 py-8 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-100
                ${selectedTab === tab.id ? 
                    `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    :
                    'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}>
                    <div className='flex flex-col items-center space-y-2'>
                        <tab.icon size={24}/>
                        <span className='font-medium text-sm'>{tab.label}</span>
                    </div>
                </button>
            ))}
        </div>


        {/* input, message and other forms */}
        <div className='w-full flex flex-col justify-center items-center bg-white rounded-xl shadow-2xl'>

            {/* sell your items form */}
            {selectedTab === "sell" && (
                <SellItems/>
            )}


            {/* your items section */}
            {selectedTab === "listings" && (
                <MyListings/>
            )}

            {/* your profile */}
            {selectedTab === "profile" && (
                <ProtectedRoute>
                    <Profile/>
                </ProtectedRoute>
                
            )}


            {/* chat section */}
            {selectedTab === "messages" && (
                <Message/>
            )}


            {/* purchased items */}
            {selectedTab === "purchased" && (
                <Purchased/>
            )}
        </div>
    </div>

    
  )
}

export default Dashboard