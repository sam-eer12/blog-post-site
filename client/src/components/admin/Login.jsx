import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const {axios,setToken} = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlesubmit = async (e) =>{
    e.preventDefault();

    try{
      const {data} = await axios.post('/api/admin/login', {email, password});
      if(data.success){
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;       
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
   
  }
  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center '>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
            <p className='font-light '>Enter your credentials to access the admin panel.</p>
          </div>
          <form onSubmit={handlesubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50' required />
            </div>

            <div className='flex mt-4 flex-col'>
              <label>Password</label>
              <input onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' className='w-full  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50' required />
            </div>
            <button type='submit' className='w-full mt-6 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
