import React from 'react'
import { assets } from '../../assets/assets';

const CommentTableItem = ({comment, fetchComments}) => {

    const {blog,createAt,_id} = comment;
    const BlogDate = new Date(createAt).toLocaleDateString();
  return (
    <tr className='order-y border-gray-200'>
        <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>Blog</b> : {blog.title} <br /><br/>
            <b className='font-medium text-gray-600'>Name</b> : {comment.name}<br/>
            <b className='font-medium text-gray-600'>Comment</b> : {comment.content}<br/>
        </td>
        <td className='px-6 max-sm:hidden py-4'>
            {BlogDate}
        </td >
        <td className='px-6 py-4'>
            <div className='inline-flex items-center gap-3'>
                {!comment.isApproved ? <img src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer'/>: <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'> Approved</p>}
                <img src={assets.bin_icon} className='w-5 hover:scale-110 transition-all cursor-pointer ml-3' onClick={() => fetchComments(_id)}/>
            </div>
        </td>     
    </tr>
  )
}

export default CommentTableItem
