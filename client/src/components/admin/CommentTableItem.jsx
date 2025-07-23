import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {

    const {blog, createdAt, _id, name, content, isApproved} = comment;
    const BlogDate = new Date(createdAt).toLocaleDateString();
    const {axios} = useAppContext();

    const approveComment = async () => {
        try {
            const {data} = await axios.post('/api/admin/approve-comment', {id: _id});
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error approving comment:', error);
            toast.error(error.response?.data?.message || "Error approving comment");
        }
    }

    const deleteComment = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
        if (!confirmDelete) return;
        
        try {
            const {data} = await axios.post('/api/admin/delete-comment', {id: _id});
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error(error.response?.data?.message || "Error deleting comment");
        }
    }
  return (
    <tr className='border-y border-gray-200'>
        <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>Blog</b> : {blog?.title || 'Unknown Blog'} <br /><br/>
            <b className='font-medium text-gray-600'>Name</b> : {name}<br/>
            <b className='font-medium text-gray-600'>Comment</b> : {content}<br/>
        </td>
        <td className='px-6 max-sm:hidden py-4'>
            {BlogDate}
        </td >
        <td className='px-6 py-4'>
            <div className='inline-flex items-center gap-3'>
                {!isApproved ? 
                    <img 
                        src={assets.tick_icon} 
                        className='w-5 hover:scale-110 transition-all cursor-pointer'
                        onClick={approveComment}
                        title="Approve comment"
                    /> 
                    : 
                    <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>
                }
                <img 
                    src={assets.bin_icon} 
                    className='w-5 hover:scale-110 transition-all cursor-pointer ml-3' 
                    onClick={deleteComment}
                    title="Delete comment"
                />
            </div>
        </td>     
    </tr>
  )
}

export default CommentTableItem
