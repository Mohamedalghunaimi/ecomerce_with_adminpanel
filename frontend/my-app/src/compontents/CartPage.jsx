import React, { useContext, useEffect } from 'react'
import { CiCircleRemove } from "react-icons/ci";

import { context } from './Provider'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CartPage = () => {
    let {cart,setCart,token,cartDetails,setCartDetails,totalPrice,products} = useContext(context)
    const nav = useNavigate()
    
    const getCartDetails = ()=> {
        let temple = []
        for(let items of Object.keys(cart)) {
            for(let item of Object.keys(cart[items])) 
            {
                if(cart[items][item]>0) {
                    temple.push({
                        _id:items,
                        size:item,
                        quantity:cart[items][item]
                    })
                }
            }
        }
        setCartDetails(temple)
    }

    const update = async(id,size,value)=> {
        
        const copy = structuredClone(cart)
        copy[id][size]= Number(value);
        setCart(copy)
        try {
            const {data} = await axios.post("http://localhost:5000/api/cart/update",{itemId:id,size,value},{
                headers:{
                    token
                }
            })
            if(data.success) {
                toast.success("updated")
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const remove = async(id,size)=> {
        const copy= structuredClone(cart)
        copy[id][size] =0
        try {
            const {data} = await axios.post("http://localhost:5000/api/cart/remove",{itemId:id,size},{
                headers:{
                    token
                }
            })
            if(data.success) {
                toast.success("deleted")
                setCart(copy)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            //toast.error(error.message)
            console.log(error)
        }


    }
    useEffect(()=> {
        getCartDetails()
    },[cart])
    
 return cartDetails.length?(
    <>
    <div className='container mx-auto h-auto min-h-[500px] py-10'>
        <table className='w-[100%] capitalize '>
            <thead className='font-semibold'>
                <tr className='text-center mb-[10px]'>
                    <td>
                        image
                    </td>
                    <td>
                        name
                    </td>
                    <td>
                        price
                    </td>
                    <td>
                        quantity
                    </td>
                    <td>
                        size
                    </td>
                    <td>
                        remove
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    cartDetails.map((element1,index)=> {
                        const product = products.find((element2)=> {
                            if(element1._id===element2._id) {
                                return true
                            }
                            return false
                        })
                        return(
                        <>
                        <tr className='text-center'>
                            <td>
                                <Link to={`/product/${element1._id}`}>
                                    <img src={product.image[0]} alt="" className='w-[100px] h-[100px] mx-auto' />
                                </Link>
                            </td>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.price} $
                            </td>
                            <td>
                                <input type='number' Value={element1.quantity} min={1}   className='border-[2px] w-[70px] h-[40px] mx-auto' onChange={(e)=> {
                                    if(Number(e.target.value)>0) {
                                        update(element1._id,element1.size,e.target.value)
                                    }
}} />
                            </td>
                            <td>
                                {element1.size}
                            </td>
                            <td>
                                <span className='mx-auto text-2xl w-fit block cursor-pointer' onClick={()=> {
                                    remove(element1._id,element1.size)
                                }}>
                                    <CiCircleRemove  className=' text-red-800 font-bold' />
                                </span>
                            </td>
                            
                        </tr>
                        </>)
                    })
                }

            </tbody>
        </table>
    </div>
    <div className='container mx-auto flex justify-end'>
        <div className='w-[400px] border-[1px] p-[10px] flex flex-col gap-[10px] capitalize'>
            <h1 className='font-bold text-xl'>
                cart totals
            </h1>
            <div className='flex items-center justify-between'>
                <span>
                    subtotal
                </span>
                <span>
                    {totalPrice()}$
                </span>
            </div>
            <div className='flex items-center justify-between'>
                <span>
                    shipping fee
                </span>
                <span>
                    10$
                </span>
            </div>
            <div className='flex items-center justify-between'>
                <span>
                    total
                </span>
                <span className='font-semibold'>
                    {totalPrice()+10}$
                </span>
            </div>
            <div className='flex justify-end'>
                <button onClick={()=> {
                    nav("/place-order")

                }} className='bg-black cursor-pointer uppercase text-white p-[10px] '>
                    proceed to checkout
                </button>
            </div>
        </div>
    </div>
    </>
  ):(<>
  <div className='h-screen flex justify-center items-center'>
    <h1 className='text-center capitalize text-xl font-semibold'>
    no product in the cart
    </h1>
  </div>

  </>)
}

export default CartPage
