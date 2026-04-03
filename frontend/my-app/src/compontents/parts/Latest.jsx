import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context } from '../Provider'

const Latest = () => {
    const {products } = useContext(context)
  return (
    <div className='flex flex-wrap justify-center gap-[15px] mt-[20px]'>
        {
            products.slice(0,10).map((e,index)=> {
                return(
                    <>
                    <Link to={`/product/${e._id}`}>
                    <div key={index} className='w-[240px] cursor-pointer overflow-hidden'>
                        <div className='overflow-hidden'>
                            <img src={e.image[0]} alt=' ' className='w-[100%] transition duration-[0.3s] hover:scale-125 ' />
                        </div>
                        <div>
                            <p className='text-sm font-semibold text-gray-800'>
                                {e.name}
                            </p>
                            <p className='font-bold text-gray-800'>
                                {e.price}$
                            </p>
                        </div>
                    </div>
                    </Link>
                    
                    
                    </>

            )
            })
        }
      
    </div>
  )
}

export default Latest
