import React from 'react'
import { assets } from '../../frontend_assets/assets'

const Services = () => {
  return (
    <div className='container mx-auto my-[200px] flex items-center justify-evenly gap-[30px] flex-wrap'>
        <div className='text-center flex flex-col gap-[5px]'>
            <img src={assets.exchange_icon} alt='' className='mx-auto mb-[20px]  w-[50px]' />
            <p className='text-2xl capitalize font-bold'>
                easy exchang policy
            </p>
            <p className='text-md text-gray-500 font-medium'>
                We offer hoassle free exhancge policy
            </p>
        </div>
        <div className='text-center flex flex-col gap-[5px]'>
            <img src={assets.quality_icon} alt='' className='mx-auto mb-[20px] w-[50px]' />
            <p className='text-2xl capitalize font-bold'>
                7 days return policy
            </p>
            <p className='text-md text-gray-500 font-medium'>
                We provide 7 days free return policy
            </p>
        </div>
        <div className='text-center flex flex-col gap-[5px]'>
            <img src={assets.support_img} alt='' className='mx-auto mb-[20px]  w-[50px]' />
            <p className='text-2xl capitalize font-bold'>
                best customer support
            </p>
            <p className='text-md text-gray-500 font-medium'>
                we provide 24/7 customer support
            </p>
        </div>
    </div>
  )
}

export default Services
