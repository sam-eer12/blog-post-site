import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCards = ({blogs}) => {

    const {title, description, category, image, _id} = blogs;
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
      <img src={image} alt={title} className='aspect-video' />
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='text-gray-600 mb-2 text-xs' dangerouslySetInnerHTML={{ "__html": description.slice(0, 80) }}></p>
      </div>
    </div>
  )
}

export default BlogCards
