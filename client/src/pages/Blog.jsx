import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { blog_data, comments_data, assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import Loader from '../components/Loader';

const Blog = () => {

  const {id}= useParams()

  const [data,setData] =useState(null);

  const [comments,setcomments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchData = async () => {
    const data =blog_data.find(item =>item._id===id)
    setData(data)
  }
  const fetchComments = async () =>{
    setcomments(comments_data)
  }

  const addComment = async (e) => {
    e.preventDefault();
  }
  useEffect(() => {
    fetchData();
    fetchComments();
  }, [])
  return data ? (
    <div className='relative'>
      <Navbar />
      <img src='/bg.png' className='absolute left-1/2 transform -translate-x-1/2 top-20 -z-1 opacity-20' />
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {new Date(data.createdAt).toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        })}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 break-words'>{data.title}</h1>
        <h2 className='my-5 max-w-lg mx-auto break-words'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Sameer Gupta</p>
      </div>
      <div className='mx-auto max-w-5xl px-5 my-10 mt-6'>
        <img src={data.image} alt={data.title} className='rounded-3xl mb-5 w-full' />
        <div dangerouslySetInnerHTML={{ __html: data.description }} className='rich-text mx-auto overflow-hidden break-words' />
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4 mt-4'>
            {comments.map((comment, index) => (
              <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-500'>
                <div className='flex items-center gap-3 mb-2'>
                  <img src={assets.user_icon} className='w-6'/>
                  <p className='font-semibold overflow-hidden text-ellipsis'>{comment.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8 break-words'>{comment.content}</p>  
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Add a comment</p>
            <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
              <input onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='Your name' className='w-full p-2 border border-gray-300 rounded outline-none' required/>
              <textarea onChange={(e)=>setContent(e.target.value)} value={content} className='w-full p-2 border border-gray-300 rounded outline-none h-48' placeholder='Your comment'></textarea>
              <button type='submit' className='bg-primary text-white px-8 p-2 rounded hover:scale-102 cursor-pointer transition-all'>Submit</button>
            </form>
        </div>
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this post:</p>
          <div className='flex gap-4 mt-2'>
            <img src={assets.facebook_icon} alt='Facebook' className='w-8 h-8 cursor-pointer hover:scale-105 transition-all' />
            <img src={assets.twitter_icon} alt='Twitter' className='w-8 h-8 cursor-pointer hover:scale-105 transition-all' />
            <img src={assets.googleplus_icon} alt='Google+' className='w-8 h-8 cursor-pointer hover:scale-105 transition-all' />
          </div>
        </div>
      </div>
      <Fotter />
    </div>
  ): <Loader />
}

export default Blog
