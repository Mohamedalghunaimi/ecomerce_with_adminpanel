import React, { useContext, useEffect, useState } from 'react'
import { context } from '../Provider'
import { Link } from 'react-router-dom'

const Collections = () => {    
        const {
        categories,types,filteredProducts,setFilteredProducts,search,setSearch,products 
        } = useContext(context)
        const [sortValue,setSortValue] = useState("1")
        const filter = ()=> {
            let productCopy = products.slice();
            if(search.length>0) {
                productCopy = productCopy.filter((e)=> {
                    if(e.name.toLowerCase().includes(search.toLowerCase())) {
                        return true 
                    }
                    return false

                })
            }
            if(categories.length) {
            productCopy = productCopy.filter((element)=> {
                if(categories.includes(element.category.toLowerCase())) {
                    return true
                }
                return false
            })
            }
            if(types.length) {
            productCopy = productCopy.filter((element)=> {
                if(types.includes(element.subCategory.toLowerCase())) {
                    return true
                }
                return false
            })
            }
            setFilteredProducts(productCopy)
        }
        const sort = ()=> {
            if(sortValue==="2") {
                setFilteredProducts(filteredProducts.sort((a,b)=> {
                    return b.price - a.price
                }))
            }
            else if(sortValue==="3") {
                setFilteredProducts(filteredProducts.sort((a,b)=> {
                    return a.price - b.price
                }))
            }
            else {
                filter()
            }
        }
        useEffect(()=> {
            filter()
        },[categories,types,search,setSearch,products])
        useEffect(()=> {
            sort()
        },[sortValue,products])

  return (
    <div className='flex-1'>
        <div className='mb-[7px] flex justify-between items-center'>
            <div className='flex items-center gap-[10px] uppercase '>
                <span className='text-3xl'>
                    <span className='mr-[5px] text-gray-500 '>
                        all
                    </span>
                    Collections
                </span>
                <span  className='w-[30px] h-[1px] bg-black'>
                </span>
            </div>
            <div>
                    <select  className='capitalize border-[1px] '   onChange={
                            async(e)=> {
                            await setSortValue(e.target.value)
                            }
                        }>
                        <option value={"1"}
                        >
                            sort by relavent
                        </option>
                        <option value={"2"} >
                            sort by :low to high
                        </option>
                        <option value={"3"}>
                            sort by :high to low
                        </option>
                    </select>
            </div>

        </div>
        <div className='flex flex-wrap gap-[5px] justify-between '>
            {filteredProducts.map((element,index)=> {
                return (
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
                    </>
                )
            })}
        </div>
    </div>
  )
}

export default Collections
