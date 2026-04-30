import  { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { context } from './Provider'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
    const {token} = useContext(context)
    const [orders,setOrders] = useState({items:[]})

    const fetchOrders = async()=> {
        try {
            const {data} = await axios.get("http://localhost:5000/api/orders/getorders",{
                headers:{
                    token
                }
            })
            console.log(data)
            if(data.success)
            {
                setOrders(data.orders[0])
            } else {
                toast.error(data.error)
            }


        } catch (error) {
        }
    }
    useEffect(()=> {
        if(token)
        fetchOrders()

    },[token])
  return orders.items.length>0?
    (
    <div className='container mx-auto flex min-h-screen flex-col gap-[10px]'>
        <h1 className='text-center text-2xl capitalize font-bold'>
            my orders
        </h1>
        {
            orders.items.map((element,index)=> {
                return(
                <div key={index+1} className='capitalize flex items-center justify-between border-b-[1px] pb-[10px]'>
                <div className='flex gap-[10px] min-w-[500px]'>
                    <img src={element.image[0]} alt='' className='w-[100px] h-[100px]'/>
                    <div className=' flex flex-col gap-[5px]'>
                        <p>{element.name}
                        </p>
                        <p className='flex items-center gap-[5px]'>
                            <span className='text-xl'>{element.price}$</span>
                            <span>quantity:{element.quantity}</span>
                            <span>size:{element.size}</span>
                        </p>
                        <p>
                            <span>
                                Date:
                            </span>
                            <span className='text-gray-500'>
                                {element.date}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-[10px]'>
                    <span className='w-[12px] h-[12px] rounded-full bg-green-600'>
                    </span>
                    <span>
                        {orders.status}
                    </span>
                </div>
                <div className='border-[1px] px-[10px] py-[5px] cursor-pointer'>
                    track order
                </div>
            </div>
                )
            })
        }
    </div>
  ):(<div className=' h-screen container mx-auto flex items-center justify-center capitalize font-bold text-2xl text-slate-700'>there is no orders</div >)
}

export default Orders
