import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context } from '../Provider'

const BestSellersProducts = () => {
    const {products } = useContext(context)
    
  return (
    <div className='flex flex-wrap gap-[20px] justify-center '>
        {
            products.map((element,index)=> {
                if(!element.bestSeller) {
                    return null
                }
                return(
                <>
                <Link to={`/product/${element._id}`}>
                <div key={index} className='w-[240px] cursor-pointer overflow-hidden'>
                        <div className='overflow-hidden'>
                            <img src={element.image[0]} alt=' ' className='w-[100%] transition duration-[0.3s] hover:scale-125 ' />
                        </div>
                        <div>
                            <p className='text-sm font-semibold text-gray-800'>
                                {element.name}
                            </p>
                            <p className='font-bold text-gray-800'>
                                {element.price}$
                            </p>
                        </div>
                </div>
                </Link>

                
                
                
                </>)
            })
        }
      
    </div>
  )
}

export default BestSellersProducts
