import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../frontend_assets/assets'

const Summary = () => {
  return (
    <div className='container mx-auto flex  mt-[20px] justify-between'>
        <div className=' max-w-[40%]'>
            <Link to={"/"} >
                <img src={assets.logo} alt='' className='w-[200px]' />
            </Link>
            <p className='max-w-[100%] mt-[10px] text-gray-700'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam impedit laborum beatae officia sit excepturi cum architecto, doloribus soluta sequi quas. Earum asperiores consequatur temporibus qui ex culpa eveniet sunt!
            </p>
        </div>
        <ul className=' capitalize  text-gray-700'>
            <h1 className='text-xl text-black font-medium capitalize mb-[10px]'>
                company
            </h1>
            <li>
                <Link to={"/"} >
                home
                </Link>
            </li>
            <li>
                <Link to={"/about"} >
                about us
                </Link>
            </li>
                        <li>
                <Link to={"/contact"} >
                delivery
                </Link>
            </li>
            <li>
                privacy policy
            </li>
        </ul>
        <ul className=' capitalize  text-gray-700'>
            <h1 className='text-xl text-black font-medium capitalize mb-[10px]'>
                get in touch
            </h1>
            <li>
                +1-212-456-7890
            </li>
            <li>
                mohammed@gmail.com
            </li>
        </ul>
      
    </div>
  )
}

export default Summary
