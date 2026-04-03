import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { context } from './Provider'

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {token,setToken} = useContext(context)
    const adminLogin = async()=> {
        try {
            const {data} = await axios.post("http://localhost:5000/api/auth/admin/login",{email,password})
            if(data.success) {
                setToken(data.token)
            }
            else {
                return toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            return toast.error(error.message)
        }
    }
  return (
    <div className='w-[100%] h-screen flex justify-center items-center'>
        <form className=' flex flex-col gap-[10px] border-[1px] p-[20px] w-[30%] min-w-[300px] capitalize shadow-lg rounded-lg'>
            <h1 className='text-center font-bold text-2xl'>
                admin panel
            </h1>
            <h1>email address</h1>
            <input type='email' placeholder='enter your email' value={email} className='border-[1px] p-[10px] capitalize' onChange={(e)=> {
                setEmail(e.target.value.toLowerCase())
            }} required/>
            <h1>
                password
            </h1>
            <input type='password' placeholder='enter your password' className='border-[1px] p-[10px] capitalize' value={password} onChange={(e)=> {
                setPassword(e.target.value.toLowerCase())
            }} />
            <input type='submit' value="login" className='bg-black text-white py-[10px] mt-[20px] rounded-lg cursor-pointer' onClick={(e)=> {
                e.preventDefault()
                console.log("yes")
                adminLogin()

            }}/>

        </form>
    </div>
  )
}

export default Login
