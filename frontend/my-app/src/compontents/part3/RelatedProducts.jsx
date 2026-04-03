import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { context } from "../Provider"

const RelatedProducts = ({category,subCategory,product}) => {
    const {products} = useContext(context)
    const [relatedProducts,setRelatedProducts]= useState(products)
    useEffect(()=> {
        let copy = products.slice();
        if(category) {
            copy = copy.filter((ele)=> {
                if(ele.category===category) {
                    return true
                }
                return false
            })
        }
        if(subCategory) {
            copy = copy.filter((ele)=> {
                if(ele.subCategory===subCategory) {
                    return true
                }
                return false
            })
        }
        setRelatedProducts(copy)


    },[products,category,subCategory])

  return (
    <div className="container mx-auto">
         <div className='flex items-center gap-[10px] uppercase justify-center'>
            <span className='text-3xl'>
                <span className='mr-[5px] text-gray-700 '>
                    related
                </span>
                products
            </span>
            <span className='w-[30px] h-[1px] bg-black'>

            </span>
        </div>
       <div className='flex flex-wrap gap-[20px] justify-center my-[50px] '>
        {
            relatedProducts.map((element,index)=> {
                if(element===product) {
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
      
    </div>
  )
}

export default RelatedProducts
