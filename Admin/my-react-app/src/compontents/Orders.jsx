import axios from 'axios'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { context } from './Provider'
import { toast } from 'react-toastify'
import { assets } from '../admin_assets/assets'


const Orders = () => {
    const [orders,setOrders] = useState([])
    const {token} = useContext(context);
    const [state,setState] = useState({status:"",id:""})

    const fetchAllOrders = async()=> {
    try {
        const {data} = await axios.get("http://localhost:5000/api/orders/allorders",{
            headers:{
                token
            }
        })
        if(data.success) {
            setOrders(data.allOrders)
        }
        else {
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
    }
    }
    const setStatus = async()=> {
        try {
            const {data} = await axios.post("http://localhost:5000/api/orders/changestatus",{
                status:state.status,
                id:state.id
            },{
                headers:{
                    token
                }
            })
            if(!data.success) {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            
        }

    }
    useEffect(()=> {
        fetchAllOrders()
    },[token])
    useEffect(()=> {
        if(state.id) {
            setStatus()

        }
    },[state])
    return orders.length?(
    <div>
        <h1 className='capitalize text-center text-3xl font-bold mb-[50px]'>
        order page
        </h1>
        {
            orders.map((element)=> {
                return(<>
                <div className='flex justify-between items-start capitalize border-[1px] p-[20px] mb-[50px]'>
                    <div>
                        <img src={assets.parcel_icon} alt='' />
                    </div>
                    <ul className='text-sm text-gray-700 font-[cairo] '>
                    {
                        element.items.map((item)=> {
                            return(<>
                            <li>
                                {item.name}x {item.quantity}<span className='capitalize'>{item.size}</span>
                            </li>
                            </>)
                        })
                    }
                    <li>
                        {element.address.firstName}
                    </li>
                    <li>
                        {element.address.street}
                    </li>
                    <li>{element.address.city} {element.address.state} {element.address.zipCode}</li>
                    <li>
                        {element.address.phone}
                    </li>
                    </ul>
                    <ul>
                        <li>
                            items:{element.items.length}
                        </li>
                        <li>
                            method:{element.paymentMethod}
                        </li>
                        <li>
                            payment : {!element.payment?"pending":"payed"}
                        </li>
                        <li>
                            date : {element.date}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            ${element.amount}
                        </li>
                    </ul>
                    <select className='border-[1px]' value={state} onChange={(e)=> {
                        setState({status:e.target.value,id:element._id})
                    }}>
                        <option value={"order placed"}>
                            order placed
                        </option>
                        <option value={"packing"}>
                            packing
                        </option>
                        <option value={"shipped"}>
                            shipped
                        </option>
                        <option value={"out for delivery"}>
                            out for delivery
                        </option>
                        <option value={"delivered"}>
                            delivered
                        </option>
                    </select>

                </div>
                
                
                </>)
            })
        }

    </div>
  ):(<></>)
}

export default Orders
