import { Clock, DollarSign, MessageCircle, Package, Plus, ShoppingBag, TrendingUp, User, Users } from 'lucide-react'
import React, { useState } from 'react'
import Overview from '../components/Overview';
import Manage from '../components/Manage';
import ManageUsers from '../components/ManageUsers';
import ReportedProducts from '../components/ReportedProducts';

const Admin = () => {

    const [selectedTab, setSelectedTab] = useState('overview');
    const userStats = [
            {label: "Total Users", value: 2 || 0, icon: Users, color: "text-blue-600 bg-blue-100"},
            {label: "Active Listings", value: 5 || 0, icon: ShoppingBag, color: "text-green-600 bg-green-100"},
            {label: "Total Sales", value: 52999 || 0, icon: DollarSign, color: "text-purple-600 bg-purple-100"},
            {label: "Pending Reviews", value: 12 || 0, icon: Clock, color: "text-red-600 bg-red-100"}
        ]
    
        const tabs = [
            {id: "overview", label: "Overview", icon: TrendingUp, color: "from-green-500 to-emerald-500"},
            {id: "manage", label: "Manage Listings", icon: Package, color: "from-blue-500 to-cyan-500"},
            {id: "users", label: "Manage Users", icon: User, color: "from-purple-500 to-pink-500"},
            {id: "reported", label: "Reported Items", icon: MessageCircle, color: "from-pink-500 to-red-500"}
        ]
  return (
    <div className='w-[83%] ml-32 flex flex-col items-center gap-8 mt-10 '>
        
        {/* Dashboard banner */}
        <div className=' bg-white w-full flex flex-col justify-center bg-gradient-to-r from-pink-600 via-red-600 to-yellow-600 py-9 px-8 rounded-2xl gap-2 shadow-lg'>
            <span className='text-4xl font-bold text-white'>Admin Panel</span>
            <span className='text-[17px] font-semibold text-gray-100'>Manage users, listings, and platform operations</span>
        </div>

        {/* User stats */}
        <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-6'>
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
        <div className='w-full bg-white grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl shadow-xl backdrop-blur-sm'>
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
            {selectedTab === "overview" && (
                <Overview/>
            )}


            {/* your items section */}
            {selectedTab === "manage" && (
                <Manage/>
            )}

            {/* your profile */}
            {selectedTab === "users" && (
                <ManageUsers/>
            )}


            {/* chat section */}
            {selectedTab === "reported" && (
                <ReportedProducts/>
            )}
        </div>
    </div>
  )
}

export default Admin