import React from 'react'

const Subscribe = () => {
  return (
    <div className='container mx-auto text-center flex flex-col gap-[10px]'>
        <p className='text-center text-2xl font-medium capitalize'>
            subscribe now & get 20% off
        </p>
        <p className='text-gray-700 font-normal'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus minus nemo.
        </p>
        <div className='border-[2px] w-[60%] mb-[200px] mx-auto flex items-center h-[50px]'>
            <input type='email' placeholder='enter your email' className='capitalize h-[100%] p-[10px] flex-1 outline-none' />
            <span className='bg-black text-white h-[100%] flex justify-center items-center px-[20px] cursor-pointer'>
                subscribe
            </span>
        </div>
    </div>
  )
}

export default Subscribe
