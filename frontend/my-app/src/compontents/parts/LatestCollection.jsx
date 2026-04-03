import React from 'react'
import Latest from './Latest'

const LatestCollection = () => {
  return (
    <div className='container mx-auto  mt-[60px]'>
        <div className='flex items-center gap-[10px] uppercase justify-center'>
            <span className='text-3xl'>
                <span className='mr-[5px] text-gray-700 '>
                    latest  
                </span>
                collections
            </span>
            <span className='w-[30px] h-[1px] bg-black'>

            </span>
        </div>
        <p className='text-center  text-sm font-semibold text-gray-700 my-[20px]'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, aperiam nostrum assumenda quod. 
        </p>
        <Latest />

    </div>
  )
}

export default LatestCollection
