import React, { useContext } from 'react'
import { context } from '../Provider'

const Filters = () => {
    const {
        categories,setCategories,types,setTypes
    } = useContext(context)
    const toggleCategory = async(e)=> {
        if(!categories.includes(e.target.value)) {
            await setCategories([...categories,e.target.value])
        }
        else {
            setCategories(categories.filter((ele)=> {
                if(ele===e.target.value) {
                    return false
                }
                return true
            }))
        }
    }
    const toggleType =async(e)=> {
        if(!types.includes(e.target.value)) {
            await setTypes([...types,e.target.value])
        }
        else {
            await setTypes(types.filter((ele)=> {
                if(ele===e.target.value) {
                    return false
                }
                return true
            }))
        }
    }

  return (
    <div className=' min-w-[20%]'>
        <h1 className='text-2xl capitalize mb-[10px]'>
            filters
        </h1>
        <form className='flex flex-col gap-[5px] border-[2px] py-[10px] px-[20px]'>
            <h1 className='uppercase font-bold'>
                categories
            </h1>
            <div className='flex items-center gap-[5px]'>
                <input id="men" type='checkbox' name="category" value="men" onChange={async(e)=> {
                    await toggleCategory(e)
                }}/>
                <label className='' for="men">
                    men
                </label>
            </div>
            <div className='flex items-center gap-[5px]'>
                <input id="women" type='checkbox' name="category" value="women"  onChange={async(e)=> {
                    await toggleCategory(e)
                }}/>
                <label className='' for="women">
                    women
                </label>
            </div>
            <div className='flex items-center gap-[5px]'>
                <input id="kids" type='checkbox' name="category" value="kids"onChange={async(e)=> {
                    await toggleCategory(e)
                }}/>
                <label className='' for="kids">
                    kids
                </label>
            </div>
        </form>
            <form className='flex mt-[10px]  flex-col gap-[5px] border-[2px]  py-[10px] px-[20px]'>
            <h1 className='uppercase font-bold'>
                type
            </h1>
            <div className='flex items-center gap-[5px]'>
                <input id="topwear" type='checkbox' name="type" value="topwear" onChange={(e)=> {
                    toggleType(e)
                }}/>
                <label className='' for="topwear">
                    topwear
                </label>
            </div>
            <div className='flex items-center gap-[5px]'>
                <input id="bottomwear" type='checkbox' name="category" value="bottomwear" onChange={(e)=> {
                    toggleType(e)
                }} />
                <label className='' for="bottomwear">
                    bottomwear
                </label>
            </div>
            <div className='flex items-center gap-[5px]'>
                <input id="winterwear" type='checkbox' name="category" value="winterwear"  onChange={(e)=> {
                    toggleType(e)
                }}/>
                <label className='' for="winterwear">
                    winterwear
                </label>
            </div>
        </form>
      
    </div>
  )
}

export default Filters
