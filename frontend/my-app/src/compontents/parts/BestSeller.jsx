import React from 'react'
import BestSellersProducts from './BestSellersProducts'

const BestSeller = () => {
  return (
    <div className='container mt-[50px] mx-auto'>
      <div className='flex items-center gap-[10px] uppercase justify-center'>
            <span className='text-3xl'>
                <span className='mr-[5px] text-gray-700 '>
                    best
                </span>
                sellers
            </span>
            <span className='w-[30px] h-[1px] bg-black'>

            </span>
        </div>
        <p className='text-center  text-sm font-semibold text-gray-700 my-[20px]'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, aperiam nostrum assumenda quod. 
        </p>
        <BestSellersProducts />
    </div>
  )
}

export default BestSeller
