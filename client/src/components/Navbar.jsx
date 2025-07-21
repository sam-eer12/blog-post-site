import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center h-25 w-auto  m-2  py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img src="/image.png" onClick={() => navigate('/')} alt="Logo" className='w-45 h-30 cursor-pointer' />
      <button onClick={() => navigate('/login')} className='bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition duration-300 cursor-pointer flex items-center'>
        Log in
        <img src='/arrow.png' alt="Arrow" className='w-4 h-4 inline ml-2' />
      </button>
    </div>
  )
}

export default Navbar;
