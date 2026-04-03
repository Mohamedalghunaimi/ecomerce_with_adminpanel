import React from 'react'
import { assets } from '../../frontend_assets/assets'

const Hero = () => {
  return (
    <div className='container mt-[20px]  mx-auto flex flex-wrap border-[1px] border-gray-500 overflow-hidden'>
        <div className='w-[50%] flex items-center justify-center'>
            <div className='p-[20px] flex flex-col gap-[10px]'>
                <div className='flex items-center gap-[10px]'>
                    <span className='w-[40px] h-[1px] bg-black'></span>
                    <span className='uppercase'>
                        our bestsellers
                    </span>
                </div>
                <div className='font-serif text-5xl'>
                    latest arrival
                </div>
                <div className='flex items-center gap-[10px] uppercase'>
                    <span>
                        show now
                    </span>
                    <span className='w-[40px] h-[1px] bg-black'></span>

                </div>
            </div>
            

        </div>
        <div className='w-[50%]'>
            <img src={assets.hero_img} alt=" " className='w-[100%]' />
        </div>
      
    </div>
  )
}

export default Hero
