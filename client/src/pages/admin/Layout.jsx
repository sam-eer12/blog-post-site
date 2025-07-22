import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const Layout = () => {
    const navigate = useNavigate();
    const logout = () => {
       
        navigate('/');
    }
  return (
    <>
      <div className='flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src="/image.png" alt="Logo" className='w-30 h-18 cursor-pointer' 
        onClick={()=>navigate('/')} />
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Log out</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
