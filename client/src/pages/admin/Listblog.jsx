import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';


const Listblog = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    setBlogs(blog_data)
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gray-50'>
      <div className='max-w-6xl mx-auto h-full flex flex-col'>
        <h1 className='text-3xl font-bold mb-8 text-gray-800'>All Blogs</h1>
        <div className='bg-white rounded-lg shadow-md overflow-hidden flex-1' style={{height: 'calc(100vh - 200px)', marginBottom: '50px'}}>
          <div className='h-full overflow-auto'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-100 border-b sticky top-0 z-10'>
                <tr>
                  <th scope='col' className='px-6 py-4 font-semibold'>
                    #
                  </th>
                  <th scope='col' className='px-6 py-4 font-semibold'>
                    Title
                  </th>
                  <th scope='col' className='px-6 py-4 font-semibold max-sm:hidden'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-4 font-semibold max-sm:hidden'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-4 font-semibold'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {blogs.map((blog,index)=>{
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1} />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Listblog
