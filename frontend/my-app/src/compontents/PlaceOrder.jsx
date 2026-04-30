import React, { useContext, useState } from 'react'
import { context } from './Provider'
import { assets } from '../frontend_assets/assets'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
    let {totalPrice,token,cart,products,setCart} = useContext(context);
    const [method,setMethod] = useState("cash on delivery");
    let nav = useNavigate();
    const [formData,setFormData]= useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipCode:"",
        country:"",
        phone:""
    })
    const change = (e)=> {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const placeOrder = async()=> {
        try {
            let orderItems = []
            for(let items of Object.keys(cart)) {
                for(let item of Object.keys(cart[items])) {
                    const product = products.find((ele)=> {
                        if(ele._id===items) {
                            return true
                        }
                        else {
                            return false
                        }
                    })
                    product.size = item ;
                    product.quantity = cart[items][item]
                    orderItems.push({...product,size:item,quantity:cart[items][item]})
                }
            }

            const orderData = {
                address:formData,
                amount:totalPrice()+10,
                items:orderItems,
                paymentMethod:method
            }
            if(method==="cash on delivery") {
            const {data} = await axios.post("http://localhost:5000/api/orders/setorders",orderData,{
                headers:{
                    token
                }
            })
            if(data.success) 
            {
                setCart({})
                nav("/orders")
            }
            }else if(method==="stripe") {
            const {data} = await axios.post("http://localhost:5000/api/orders/setordersbystripe",orderData,{
                headers:{
                    token
                }
            })
            if(data.success) {
                setCart({})
                window.location.replace(data.session_url)
            }
            else {
                toast.error(data.message)
            }
            }else {

            }


        

        }catch(error) {
            console.log(error)

        }
    }
    return (
    <div className='container mx-auto flex min-h-[500px] mt-[70px] gap-[100px] flex-wrap'>
        <div className='w-[50%] h-auto'>
            <h1 className='capitalize font-semibold mb-[10px] text-3xl'>
                delivery information
            </h1>
            <form className='flex gap-[10px] flex-wrap justify-between'> 
                <input type='text' placeholder='first name' name='firstName' value={formData.firstName} onChange={(e)=> {
                    change(e)
                }} className='p-[5px] capitalize border-[1px] w-[49%] ' />
                <input type='text' placeholder='last name' name='lastName' className='p-[5px] capitalize border-[1px] w-[49%] ' value={formData.lastName} onChange={(e)=> {
                    change(e)
                }}  />
                <input type='email' placeholder='email address' name='email' className='p-[5px] capitalize border-[1px] w-[100%] '  value={formData.email} onChange={(e)=> {
                    change(e)
                }} />
                <input type='text' placeholder='street' name='street' className='p-[5px] capitalize border-[1px] w-[100%] ' value={formData.street} onChange={(e)=> {
                    change(e)
                }}  />
                <input type='text' placeholder='city' name='city' className='p-[5px] capitalize border-[1px] w-[49%] ' value={formData.city} onChange={(e)=> {
                    change(e)
                }}  />
                <input type='text' placeholder='state' name='state' className='p-[5px] capitalize border-[1px] w-[49%] ' value={formData.state} onChange={(e)=> {
                    change(e)
                }}  />
                <input type='number' placeholder='zipcode' name='zipCode' className='p-[5px] capitalize border-[1px] w-[49%] 'value={formData.zipCode} onChange={(e)=> {
                    change(e)
                }}  />
                <input type='text' placeholder='country' name='country' className='p-[5px] capitalize border-[1px] w-[49%] ' value={formData.country} onChange={(e)=> {
                    change(e)
                }}  />
                <input type='number' placeholder='phone' name='phone' className='p-[5px] capitalize border-[1px] w-[100%] ' value={formData.phone} onChange={(e)=> {
                    change(e)
                }}  />
            </form>
        </div>
        <div className='flex-1 '  >
            <h1 className='font-bold text-3xl mb-[10px] text-center capitalize'>
                cart total
            </h1>
            <div className='capitalize flex flex-col gap-[10px]'>
                <div className='flex items-center justify-between border-b-[1px]'>
                    <span>subtotal</span>
                    <span>${totalPrice()}</span>
                </div>
                <div className='flex items-center justify-between border-b-[1px]'>
                    <span>
                        shipping fee
                    </span>
                    <span>
                        $10
                    </span>
                </div>
                <div className='flex items-center justify-between border-b-[1px]'>
                    <span className='font-bold'>
                        total
                    </span>
                    <span>
                        ${totalPrice()+10}
                    </span>
                </div>
                <h1 className='text-xl font-semibold text-gray-700'>payment methods</h1>
                <div className='flex flex-wrap items-center justify-between'>
                    <div className={`w-[30%] border-[1px] gap-[10px] flex items-center h-[40px] justify-center cursor-pointer  `} onClick={()=> {
                        setMethod("stripe")
                    }}>
                        <div className={`w-[15px] h-[15px] rounded-full    ${method==="stripe"?"bg-green-700":""}`}>
                        </div>
                        <img src={assets.stripe_logo} alt="" className=' w-[70px]'/>
                    </div>
                    <div className='w-[30%] border-[1px] flex items-center gap-[10px] h-[40px] justify-center cursor-pointer ' onClick={()=> {
                        setMethod("razorpay")
                    }}>
                        <div className={`w-[15px] h-[15px] rounded-full  ${method==="razorpay"?"bg-green-700":""}`}>
                        </div>
                        <img src={assets.razorpay_logo} alt="" className='w-[100px]'/>
                    </div>
                    <div className={`w-[30%] border-[1px]  flex items-center gap-[10px] h-[40px] justify-center cursor-pointer`} onClick={()=> {
                        setMethod("cash on delivery")
                    }}>
                        <div className={`w-[15px] h-[15px] rounded-full   ${method==="cash on delivery"?"bg-green-700":""} `}>
                        </div>
                        <span className=''>cash on delivery</span>
                    </div>
                </div>
                <button className='block bg-black text-white ml-auto py-[5px] px-[15px]  capitalize cursor-pointer' onClick={()=> {
                    if(!method) {
                        return toast.error("please select the payment method")
                    }
                    placeOrder()
                }}>
                    place order
                </button>
            </div>

        </div>

    </div>
  )
}

export default PlaceOrder
