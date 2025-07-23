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

  const generateContent = async (e) => {
    e.preventDefault();
    
    if (!title || title.trim() === '') {
      toast.error('Please enter a title before generating content');
      return;
    }
    
    if (!quillRef.current) {
      toast.error('Editor not initialized properly');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Generating content for title:', title);
      
      const response = await axios.post('/api/blog/generate', {
        prompt: title.trim()
      }, {
        timeout: 60000 // 60 second timeout for AI generation
      });
      
      console.log('Generate response:', response.data);
      
      if (response.data && response.data.success) {
        const parsedContent = parse(response.data.content);
        quillRef.current.root.innerHTML = parsedContent;
        toast.success('Content generated successfully');
      } else {
        toast.error(response.data?.message || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error('Content generation timeout - please try again');
      } else if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           'Server error during content generation';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error('Network error: Unable to connect to server for content generation');
      } else {
        toast.error('Error generating content: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => { 
    e.preventDefault();
    
    // Validate required fields before proceeding
    if (!title || !subTitle || !image) {
      toast.error('Please fill all required fields and upload an image');
      return;
    }
    
    if (!quillRef.current) {
      toast.error('Editor not initialized properly');
      return;
    }

    try{
      setIsAdding(true);
      
      const description = quillRef.current.root.innerHTML;
      if (!description || description.trim() === '<p><br></p>' || description.trim() === '') {
        toast.error('Please add some content to the blog description');
        return;
      }
      
      const blog = {
        title: title.trim(),
        subTitle: subTitle.trim(),
        description: description,
        category,
        isPublished
      }
      
      console.log('Submitting blog:', blog);
      console.log('Image file:', image);
      console.log('API Base URL:', axios.defaults.baseURL);
      
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const response = await axios.post('/api/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000 // 30 second timeout
      });
      
      console.log('API Response:', response.data);
      
      if (response.data && response.data.success){
        toast.success(response.data.message || 'Blog added successfully');
        // Reset form
        setImage(false);
        setTitle('');
        setSubTitle('');
        if (quillRef.current) {
          quillRef.current.root.innerHTML = '';
        }
        setCategory('Startup');
        setIsPublished(false);
      } else {
        toast.error(response.data?.message || 'Failed to add blog');
      }
      
    } catch (error) {
      console.error("Error adding blog:", error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout - please try again');
      } else if (error.response) {
        // Server responded with error status
        console.error('Response error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `Server error (${error.response.status})`;
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.request);
        toast.error('Network error: Unable to connect to server. Please check your internet connection.');
      } else {
        // Something else happened
        console.error('Unexpected error:', error.message);
        toast.error('Unexpected error: ' + error.message);
      }
    } finally {
      setIsAdding(false);
    }
  }
  useEffect(() => {
    // Initialize Quill editor
    const initializeEditor = () => {
      if (!quillRef.current && editorRef.current) {
        try {
          quillRef.current = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
              toolbar: [
                ['heading', { 'font': [] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image']
              ]
            }
          });
          console.log('Quill editor initialized successfully');
        } catch (error) {
          console.error('Error initializing Quill editor:', error);
          toast.error('Failed to initialize editor');
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeEditor, 100);
    
    return () => {
      clearTimeout(timeoutId);
      // Cleanup Quill on unmount
      if (quillRef.current) {
        try {
          quillRef.current = null;
        } catch (error) {
          console.error('Error cleaning up Quill editor:', error);
        }
      }
    };
  }, [])
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
