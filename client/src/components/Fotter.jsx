import React from 'react'
import { footer_data } from '../assets/assets'

const Fotter = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col md:flex-row items-start justify-between py-10 gap-10 border-b border-gray-500/30 text-gray-500'>
        <div>
            <img src='image.png' alt='Logo' className='w-40 sm:w-48' />
            <p className='mt-6 max-w-[400px] text-sm'>Amethyst Wave is your go-to platform for insightful blogs and engaging content. Join us in exploring the world of ideas and creativity.</p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((section,index)=>(
                <div key={index}>
                    <h3 className='font-semibold text-base text-gray-700 md:mb-5 mb-2'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {section.links.map((link,i)=>(
                            <li key={i}>
                                <a href="#" className='hover:underline transition'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright © 2025 Amethyst Wave. All rights reserved.</p>
    </div>
  )
}

export default Fotter
