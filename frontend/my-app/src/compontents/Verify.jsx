import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { context } from './Provider'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
     const location = useLocation()
     const {token} = useContext(context)
     const nav = useNavigate()
     const queryParams = new URLSearchParams(location.search)
     const Verify = async()=> {
        try {
            const {data} = await axios.post("http://localhost:5000/verify",{
                success:queryParams.get("success"),
                orderId:queryParams.get("orderId"),
            },{
                headers:{
                    token
                }
            })
            if(data.success) {
                nav("/")
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            
        }

     }
    useEffect(()=> {
        Verify()



    },[token])

  return (
    <div>
      Verify
    </div>
  )
}

export default Verify
