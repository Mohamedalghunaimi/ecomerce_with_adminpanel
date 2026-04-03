import React, { useContext } from 'react'
import { assets } from '../admin_assets/assets'
import { Link } from 'react-router-dom'
import { context } from './Provider'

const Navbar = () => {
    const {setToken} = useContext(context)
  return (
    <div className=' border-b-[2px]'>
    <div className='container mx-auto flex items-center justify-between pb-[10px]'>
        <div className='w-[150px]'>
            <Link to={"/"}>
                <img src={assets.logo} alt='' className='w-[100%]'/>
            </Link>
        </div>
        <div className='w-fit py-[5px] px-[30px] bg-slate-800 text-white rounded-full cursor-pointer ' onClick={()=> {
            setToken("")
        }}>
            logout
        </div>
    </div>
    </div>
  )
}

export default Navbar
