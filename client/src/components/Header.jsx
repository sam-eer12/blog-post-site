import React,{ useRef } from 'react'
import { useAppContext } from '../context/AppContext'


const Header = () => {


  const {setInput,input} = useAppContext();
  const inputRef = useRef()
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
    
  }

  const onclear = () => {
    setInput("");
    inputRef.current.value = "";
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mb-8 mt-20'>
          <div className='inline-flex items-center bg-purple-100 justify-center gap-2 px-6 py-1.5 mb-4 border border-purple-300 rounded-full text-sm text-primary'>
            <p>New: AI features</p>
            <img src='star.png' alt='Icon' className='inline ml-2 w-2.5 h-2.5' />
          </div>
          <h1 className='text-3xl  sm:text-6xl sm:leading-16 text-gray-700 font-semibold'>Welcome to Our<span className='text-primary'> Blog</span>  <br/> Site</h1>
          <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>This is your space to share ideas and insights. Represent your thoughts and creativity through engaging content.</p>

          <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden '>
            <input ref={inputRef} type="text" placeholder='Search for posts...' className='w-full outline-none pl-4 ' required/>
            <button type="submit" className='bg-primary text-white px-8 m-1.5 rounded hover:scale-105 transition-all cursor-pointer py-2'>Search</button>
          </form>
        </div>
        <div className='text-center'>
          {input && <button onClick={onclear} className='border font-light text-xs bg-primary text-white py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
        </div>
        <img src='/bg.png' alt='Background' className='absolute opacity-20 -top-50 -z-1' />
      
    </div>
  )
}

export default Header
