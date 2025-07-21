import React from 'react'
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
    const logout = () => {
       
        navigate('/');
    }
  return (
    <>
      <div>
        <img src="/image.png" alt="Logo" className='w-45 h-30 cursor-pointer' 
        onClick={()=>navigate('/')} />
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Log out</button>
      </div>
    </>
  )
}

export default Layout
