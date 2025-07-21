import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss an Update!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to our newsletter to stay updated on the latest blog posts.</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
        <input type="email" placeholder="Enter your email" className="border border-gray-300 rounded-md px-2 h-full border-r-0 outline-none rounded-r-none text-gray-500 w-full" required />
        <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none">Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
