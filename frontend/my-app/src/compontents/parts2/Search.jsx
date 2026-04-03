import React, { useContext} from 'react'
import { context } from '../Provider'
import { assets } from '../../frontend_assets/assets'

const Search = () => {
  let {search,setSearch,setShowSearch} = useContext(context)




  return (
    <div className='container m-auto flex items-center justify-center w-[50%] gap-[10px] border-[2px] p-[20px] rounded-full mb-[20px] '>
      <input type='search' placeholder='enter title of the product' value={search} className='flex-1 capitalize outline-none' onChange={(e)=> {
        setSearch(e.target.value)
      }} />
      <div>
        <img src={assets.cross_icon} alt=" " className='cursor-pointer' onClick={async()=> {
          await setSearch("")
          setShowSearch(false)
          
        }} />
      </div>
    </div>
  )
}

export default Search
