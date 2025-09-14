import { Briefcase, Building, Calendar, Edit3, Key, LogOut, Mail, MapPin, Phone, Shield, User } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Message from './Message'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Profile = () => {
  const {user, setUser} = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const {register, handleSubmit} = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [userJoinedDate, setUserJoinedDate] = useState('');
  const date = new Date(user.createdAt).toLocaleString().split(',')[0];

  const handleEditFormSubmit = async(update)=>{
    try{
      const response = await axios.put(`${API_URL}/user/update-user`, {
        phone: update.phone,
        location: update.location,
        bio: update.bio
      }, 
    {withCredentials:true}
    );

    console.log(response.data);
    setUser(response.data.user)
    setIsEditing(false);
    }catch(error){

    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center py-8 px-8 gap-8'>
      {/* profile banner */}
      <div className='w-full flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-10 rounded-2xl text-white'>
        <div className='bg-white/20 p-6 rounded-full'>
          <User size={36} className='text-white'/>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-3xl font-bold text-white'>{user.name}</div>
          <div className='flex gap-2'>
            <Calendar className='text-gray-300'/>
            <span className='text-gray-300'>Member since {date}</span>
          </div>
        </div>
      </div>

      {/* profile information */}
      <div className='w-full flex flex-col'>
        <div className='w-full flex justify-between bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-6 rounded-t-lg'>
          <div className='flex gap-4 justify-center items-center'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <User size={24} className='text-blue-700'/>
            </div>
            <span className='text-2xl font-semibold'>Profile Information</span>
          </div>
          {isEditing ? 
            (
              <button 
              onClick={()=>setIsEditing(!isEditing)}
              className='flex justify-center items-center gap-4 bg-red-500 py-2 px-4 rounded-md hover:opacity-90 cursor-pointer'>
                <Edit3 size={18} className='text-white' />
                <span className='text-white'>Cancel</span>
              </button>
            )
            :
            (
              <button
              onClick={()=>setIsEditing(!isEditing)} 
              className='flex justify-center items-center gap-4 bg-black py-2 px-6 rounded-md hover:opacity-90 cursor-pointer'>
                <Edit3 size={18} className='text-white' />
                <span className='text-white'>Edit Profile</span>
              </button>
            )
            }
        </div>

        {isEditing ?
          (
            <form onSubmit={handleSubmit(handleEditFormSubmit)} className='w-full flex flex-col justify-center items-center shadow-lg px-8 py-6 gap-8'>
              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-gray-700'>Full Name (Read-only)</span>
                  <input 
                  type="text"
                  placeholder={"John Doe"}
                  className='border-2 border-gray-200 p-3 rounded-md bg-gray-50 cursor-not-allowed' 
                  disabled
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-gray-700'>Email (Read-only)</span>
                  <input 
                  disabled
                  placeholder={"john.doe@curaj.ac.in"}
                  className='border-2 border-gray-200 p-3 rounded-md bg-gray-50 cursor-not-allowed'
                  />
                </div>
              </div>



              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-gray-700'>Phone Number</span>
                  <input 
                  type="text"
                  name="phone"
                  placeholder={"9341380229"}
                  className='border-2 border-gray-200 p-3 rounded-md' 
                  {...register('phone')}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-gray-700'>Role (Read-only)</span>
                  <input 
                  disabled
                  placeholder={"eg. Student, Faculty, Admin"}
                  className='border-2 border-gray-200 p-3 rounded-md cursor-not-allowed bg-gray-50'
                  />
                </div>
              </div>




              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-gray-700'>Department (Read-only)</span>
                  <input 
                  type="text"
                  placeholder={"CSE, BSC, MBA"}
                  className='border-2 border-gray-200 p-3 rounded-md bg-gray-50 cursor-not-allowed' 
                  disabled
                  />
                </div>

                {/* <div className='flex flex-col gap-2'>
                  <span>Location</span>
                  <input 
                  type="number" 
                  placeholder={"Enter your location inside campus"}
                  className='border-1 border-gray-400 p-3 rounded-sm'
                  />
                </div> */}
              </div>




              <div className='w-full flex flex-col gap-2 '>
                <span className='text-sm font-semibold text-gray-700'>Location</span>
                <input 
                type="text"
                name="location"
                placeholder={"Enter your address inside campus"}
                className='border-2 border-gray-200 p-3 rounded-md'
                {...register('location')}
                />
              </div>

              
              <div className='w-full flex flex-col gap-2 '>
                <span className='text-sm font-semibold text-gray-700'>Bio</span>
                <textarea 
                name="bio" 
                placeholder=''
                rows={3}
                className='border-2 border-gray-200 p-3 rounded-md resize-none'
                {...register('bio')}
                ></textarea>
              </div>


              <button onClick={handleEditFormSubmit}
              className='w-full text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-md hover:from-gree-600 hover:to-teal-600 cursor-pointer'>
                Save Changes
              </button>
            </form>
          )
          :
          (
          <div className='w-full flex justify-center items-center shadow-lg rounded-lg'>

          <div className='w-full flex flex-col justify-center items-center px-8 py-8 gap-6'>
            <div className='w-full grid grid-cols-2 gap-6'>
              <div className='w-full flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-lg'>
                <div className='p-2 bg-blue-100 rounded-lg'>
                  <User size={22} className='text-blue-700'/>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold text-gray-600'>Full Name</span>
                  <span className='text-lg font-semibold text-black'>{user.name}</span>
                </div>
              </div>

              <div className='w-full flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-xl'>
                <div className='p-2 bg-purple-100 rounded-lg'>
                  <Mail size={22} className='text-purple-700'/>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold text-gray-600'>Email</span>
                  <span className='text-lg font-semibold text-black'>{user.email}</span>
                </div>
              </div>
            </div>



            <div className='w-full grid grid-cols-2 gap-6'>
              <div className='w-full flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-xl'>
                <div className='p-2 bg-green-100 rounded-lg'>
                  <Phone size={22} className='text-green-700'/>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold text-gray-600'>Phone</span>
                  <span className='text-lg font-semibold text-black'>{user.phone? (user.phone):("Not Provided")}</span>
                </div>
              </div>

              <div className='w-full flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-lg'>
                <div className='p-2 bg-orange-100 rounded-lg'>
                  <MapPin size={22} className='text-orange-700'/>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold text-gray-600'>Location</span>
                  <span className='text-lg font-semibold text-black'>{user.location? (user.location):("Not Provided")}</span>
                </div>
              </div>
            </div>



            <div className='w-full grid grid-cols-2 gap-6'>
              <div className='w-full flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-lg'>
                <div className='p-2 bg-indigo-100 rounded-lg'>
                  <Briefcase size={22} className='text-indigo-700'/>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold text-gray-600'>Role</span>
                  <span className='text-lg font-semibold text-black'>{user.role}</span>
                </div>
              </div>

              <div className='w-full flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-xl'>
                <div className='p-2 bg-teal-100 rounded-lg'>
                  <Building size={22} className='text-teal-700'/>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold text-gray-600'>Department</span>
                  <span className='text-lg font-semibold text-black'>{user.department}</span>
                </div>
              </div>
            </div>



            <div className='w-full flex flex-col justify-center gap-2 bg-blue-50 px-4 py-6 rounded-xl'>
              <span className='text-sm font-semibold text-gray-600'>Bio</span>
              <span className='text-md font-normal text-gray-700'>{user.bio? (user.bio): "Bio not Provided: Add your bio to let users know about you and trust you."}</span>
            </div>

          </div>
        </div>
          )}

        


      </div>

      {/* Account security */}
      <div className='w-full flex flex-col m-0 p-0 rounded-xl shadow-2xl'>
        <div className='w-full flex justify-between bg-gradient-to-r from-red-50 to-yellow-50 px-6 py-6 rounded-t-lg'>
          <div className='flex gap-4 justify-center items-center'>
            <div className='p-2 bg-red-100 rounded-lg'>
              <Shield size={24} className='text-red-700'/>
            </div>
            <span className='text-2xl font-semibold'>Account Security</span>
          </div>
        </div>

        <div className='w-full flex flex-col px-6 py-6 gap-4'>
          <button className='w-full flex gap-6 bg-white py-2 px-4 border-2 border-gray-300 rounded-md hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-100 cursor-pointer'>
            <div className='p-2 bg-yellow-100 rounded-lg'>
              <Key size={20} className='text-yellow-700'/>
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold text-black'>Change Password</span>
              <span className='text-sm font-semibold text-gray-600'>Update your account password</span>
            </div>
          </button>


          <button className='w-full flex gap-6 bg-red-400 py-2 px-4 border-2 border-red-300 rounded-md hover:bg-red-500 hover:border-gray-500 transition-all duration-100 cursor-pointer'>
            <div className='p-2 bg-red-100 rounded-lg'>
              <LogOut size={20} className='text-red-700'/>
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold text-white'>Sign Out</span>
              <span className='text-sm font-semibold text-white/50'>Sign out of your account</span>
            </div>
          </button>

          
        </div>
      </div>

      
    
    </div>
  )
}

export default Profile