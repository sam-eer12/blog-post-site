import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'

import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';

import toast from 'react-hot-toast';

const Dashboard = () => {

  const [dashboardData, setDasboardData] = useState({
    blogs:0,
    comments:0,
    drafts:0,
    recentBlogs:[]
  })

  const {axios, token} = useAppContext();
  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      const {data} = await axios.get('/api/admin/dashboard');
      console.log('Dashboard response:', data);
      
      if (data.success) {
        setDasboardData({
          blogs: data.blogs,
          comments: data.comments,
          drafts: data.drafts,
          recentBlogs: data.recentBlogs
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error(error.response?.data?.message || "Error fetching dashboard data");
    }
  }

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token])
  return (
    <div className='p-6 flex-1 h-[calc(100vh-70px)] ms:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4 '>
        <div className='flex flex-wrap gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} />
          <div >
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-500 font-light'>Blogs</p>
          </div>        
        </div>
        <div className='flex flex-wrap gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} />
          <div >
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-500 font-light'>Comments</p>
          </div>        
        </div>
        <div className='flex flex-wrap gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} />
          <div >
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-500 font-light'>Drafts</p>
          </div>        
        </div>
        
      </div>
      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} className='w-8 h-8 mt-6 mb-2' />
          <p className='text-gray-600 font-semibold'>Recent Blogs</p>
        </div>
        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  #
                </th>
                <th scope='col' className='px-6 py-3'>
                  Title
                </th>
                <th scope='col' className='px-6 py-3 max-sm:hidden'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3 max-sm:hidden'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog,index)=>{
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index+1} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
