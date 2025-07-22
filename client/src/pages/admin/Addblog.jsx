import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';

const Addblog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [subTitle, setSubTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent= async (e)=>{

  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }
  useEffect(()=>{
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [['heading', { 'font': [] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image']
          ]
        }
      });
    }
  },[])
  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor='image'>
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer'></img>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </label>
        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Enter the title' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setTitle(e.target.value)} value={title} />

        <p className='mt-4'>Blog Subtitle</p>
        <input type="text" placeholder='Enter the subtitle' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />

        <p className='mt-4'>Blog description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          <button onClick={generateContent} type='button' className=' absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:undeline cursor-pointer'>
            Generate with AI
          </button>
        </div>
        <p className='mt-4'>Category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Startup</option>
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" className='scale-125 cursor-pointer' checked={isPublished} onChange={e => setIsPublished(e.target.checked)} />
        </div>
        <button type='submit' className='mt-6 bg-primary text-white px-8 py-2 rounded hover:scale-102 cursor-pointer transition-all'>Add Blog</button>
      </div>
    </form>
  )
}

export default Addblog
