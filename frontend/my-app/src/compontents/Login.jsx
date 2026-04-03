import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { context } from './Provider'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom';

const Login = () => {
    const [state,setState] = useState("login")
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const {setToken,token} = useContext(context)
    const nav = useNavigate()
    useEffect(()=> {
        if(token) {
            nav("/")
        }
        console.log("from login")

    },[token])

    const submit = async()=> {
        try {
            if(state==="login") {
            const {data} = await axios.post("http://localhost:5000/api/auth/login",{email,password})
            if(data.success) {
                setToken(data.token)
                localStorage.setItem("token",data.token)
                nav("/")
            }
            else {
                toast.error(data.message)
            }
            }
            else {
                 const {data} = await axios.post("http://localhost:5000/api/auth/register",{name,email,password})
            if(data.success) {
                setToken(data.token)
                localStorage.setItem("token",data.token)
                nav("/")
            }
            else {
                toast.error(data.message)
            }
            }
        } catch (error) {
                toast.error(error.message)

        }

    }
  return (
    <div className='container mx-auto min-h-[500px] flex justify-center items-center'>
        <div className='flex flex-col gap-[10px]  w-[400px]'>
            <h1 className='capitalize text-2xl font-semibold text-center'>
                {state}
            </h1>
            {state==="sign in"?<input type='text' className='border-[1px] p-[5px]'  placeholder='name' value={name} onChange={(e)=> {
                setName(e.target.value)
            }} />:<></>}
            <input type='text' placeholder='email' className='border-[2px] p-[5px]'  value={email} onChange={(e)=> {
                setEmail(e.target.value)
            }} />
            <input type='text' placeholder='password' className='border-[2px] p-[5px]'   value={password} onChange={(e)=> {
                setPassword(e.target.value)
            }} />
            <div className='flex justify-between items-center capitalize'>
                <span className='cursor-pointer hover:underline'>
                    forget password ?
                </span>
                {state==="sign in"?<> <span className='cursor-pointer hover:underline' onClick={()=> {
                    setState("login")
                }}>
                    login here
                </span></>:<> <span className='cursor-pointer hover:underline' onClick={()=> {
                    setState("sign in")
                }}>
                    create account
                </span></>}
               
            </div>
            <button onClick={()=> {
                submit()
            }} className='bg-black text-white py-[10px] mt-[10px] px-[50px] w-fit mx-auto'>
                {state}
            </button>
        </div>
      
    </div>
  )
}

export default Login
