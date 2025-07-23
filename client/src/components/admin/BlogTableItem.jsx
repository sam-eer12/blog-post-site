import React from 'react'
import { assets } from '../../assets/assets';

import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog,fetchBlogs,index}) => {

    const {title,createdAt} = blog;
    const BlogDate = new Date(createdAt)

    const {axios} = useAppContext();

    const deleteBlog = async () =>{
      const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
      if (!confirmDelete) return;
      try {
        console.log('Deleting blog with ID:', blog._id);
        const {data} = await axios.post('/api/blog/delete', {id: blog._id});
        console.log('Delete response:', data);
        if (data.success) {
          toast.success(data.message);
          await fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error(error.response?.data?.message || "Error deleting blog");
      }
    }

    const togglePublish = async () => {
      try {
        console.log('Toggling publish status for blog ID:', blog._id);
        const {data} = await axios.post('/api/blog/toggle-publish', {id: blog._id});
        console.log('Toggle publish response:', data);
        if (data.success) {
          toast.success(data.message);
          await fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error toggling publish status:', error);
        toast.error(error.response?.data?.message || "Error toggling publish status");
      }
    }
  return (
    <tr className='border-y border-gray-200'>
      <th className='px-2 py-4'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toLocaleDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? 'text-green-500' : 'text-red-500'}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
      </td>
      <td className='px-2 py-4 flex -text-xs gap-3'>
        <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? 'Unpublished' : 'Published'}</button>
        <img onClick={deleteBlog} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' />
      </td>
    </tr>
  )
}

export default BlogTableItem
