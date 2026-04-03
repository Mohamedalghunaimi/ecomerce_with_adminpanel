import { useContext } from 'react';
import { assets } from '../admin_assets/assets'
import { MdFilterListAlt } from "react-icons/md";
import { context } from './Provider';

const Sidebar = () => {
    const {content,setContent} = useContext(context)
    console.log(content)
  return (
    <div className='min-h-screen min-w-[250px] border-r-[2px] flex flex-col gap-[10px] pt-[50px]'>
        <div className={`flex items-center gap-[10px] border-[2px] cursor-pointer capitalize border-r-[0px] p-[10px] ${content==="add"?"bg-red-500 text-white":""}` }onClick={()=> {
            setContent("add")
        }}>
            <img src={assets.add_icon} alt="" className='w-[20px] h-[20px]' />
            <div>
                add items
            </div>
        </div>
         <div className={`flex items-center gap-[10px] border-[2px] cursor-pointer capitalize border-r-[0px] p-[10px] ${content==="list"?"bg-red-500 text-white":""}` }onClick={()=> {
            setContent("list")
        }}>
            <MdFilterListAlt />
            <div>
                list items
            </div>
        </div>
         <div className={`flex items-center gap-[10px] border-[2px] cursor-pointer capitalize border-r-[0px] p-[10px] ${content==="order"?"bg-red-500 text-white":""}` }onClick={()=> {
            setContent("order")
        }}>
            <MdFilterListAlt />
            <div>
                orders
            </div>
        </div>

    </div>
  )
}

export default Sidebar
