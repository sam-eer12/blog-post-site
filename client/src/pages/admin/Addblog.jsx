import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked';

const Addblog = () => {

  const {axios} = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [subTitle, setSubTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent= async (e)=>{
    if(!title) return toast.error('Please enter a title before generating content');
    try {
      setLoading(true)
      const {data} = await axios.post('/api/blog/generate',{prompt:title})
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
        toast.success('Content generated successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error generating content');
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => { 
    try{
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished
      }
      const formData = new FormData();
      formData.append('blog',JSON.stringify(blog));
      formData.append('image', image);

      const {data} = await axios.post('/api/blog/add', formData);
     if (data.success){
      toast.success(data.message);
      setImage(false);
      setTitle('');
      quillRef.current.root.innerHTML = '';
      setCategory('Startup');
      
     }else{
      toast.error(data.message);
     }
      
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsAdding(false);
    }
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
          {loading && (
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>

            </div>)}
          <button disabled={loading} onClick={generateContent} type='button' className=' absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:undeline cursor-pointer'>
            Generate with AI
          </button>
        </div>
        <p className='mt-4'>Category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select an Option</option>
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" className='scale-125 cursor-pointer' checked={isPublished} onChange={e => setIsPublished(e.target.checked)} />
        </div>
        <button disabled={isAdding} type='submit' className='mt-6 bg-primary text-white px-8 py-2 rounded hover:scale-102 cursor-pointer transition-all'>{isAdding ? 'Adding...' : 'Add Blog'}</button>
      </div>
    </form>
  )
}

export default Addblog
