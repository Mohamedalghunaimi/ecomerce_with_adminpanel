import React, { useContext, useState } from 'react'
import { assets } from '../admin_assets/assets'
import axios from 'axios'
import { context } from './Provider'
import { toast } from 'react-toastify'

const Add = () => {
    const {token} = useContext(context)
    const [img1,setImg1] = useState(false)
    const [img2,setImg2] = useState(false)
    const [img3,setImg3] = useState(false)
    const [img4,setImg4] = useState(false)
    /*--------------------------------------------------*/
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("men")
    const [subCategory,setSubCategory] = useState("topwear")
    const [price,setPrice] = useState(0)
    const [sizes,setSizes] = useState([])
    const [bestseller,setBestSeller] = useState(false)
    const [loading,setLoading] = useState(false)
    /*-------------------------------------------------------*/
    const removeOrAdd = (size) => {
        if(sizes.includes(size)) {
            setSizes(sizes.filter((ele)=> {
                if(ele===size) {
                    return false
                }
                return true
            }))
        }
        else {
            setSizes([...sizes,size])
        }
    }
    /*----------------------------------------------------------------*/
    const add = async() => {
        let formData = new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("price",Number(price))
        formData.append("sizes",JSON.stringify(sizes))
        formData.append("bestSeller",bestseller)
        img1&&formData.append("image1",img1)
        img2&&formData.append("image2",img2)
        img3&&formData.append("image3",img3)
        img4&&formData.append("image4",img4)
        try {
            setLoading(true);
            const {data} = await axios.post("http://localhost:5000/product/add",formData,{
                headers: {
                    token
                }
            })
            if(data.success) {
                toast.success("add")
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
    <div className='capitalize flex flex-col gap-[10px]'>
        <h1>
            upload image
        </h1>
        <div className='flex gap-[10px]'>
            <label for="img1">
                <input disabled={loading} type='file' hidden  id="img1" required  onChange={(e)=> {
                    setImg1(e.target.files[0])
                }}/>
                <img src={!img1?assets.upload_area:URL.createObjectURL(img1)} className='cursor-pointer w-[100px] h-[100px]' alt=" "/>
            </label>
            <label for="img2">
                <input disabled={loading} type='file' hidden  id="img2"   onChange={(e)=> {
                    setImg2(e.target.files[0])
                }}/>
                <img src={!img2?assets.upload_area:URL.createObjectURL(img2)} className='cursor-pointer w-[100px] h-[100px]' alt=" "/>
            </label>
            <label for="img3">
                <input disabled={loading} type='file' hidden  id="img3"  onChange={(e)=> {
                    setImg3(e.target.files[0])
                }}/>
                <img  src={!img3?assets.upload_area:URL.createObjectURL(img3)} className='cursor-pointer w-[100px] h-[100px]' alt=" "/>
            </label>
            <label for="img4">
                <input disabled={loading} type='file' hidden  id="img4"    onChange={(e)=> {
                    setImg4(e.target.files[0])
                }}/>
                <img src={!img4?assets.upload_area:URL.createObjectURL(img4)} className='cursor-pointer w-[100px] h-[100px]' alt=" "/>
            </label>
        </div>
        <h1>product name</h1>
        <input type='text' placeholder='type here' value={name} required className='border-[2px] w-[500px] p-[10px]' onChange={(e)=> {
            setName(e.target.value)
        }} />
        <h1>
            product description
        </h1>
        <textarea placeholder='write content here' className='border-[2px] w-[500px] p-[10px]' value={description} required onChange={(e)=> {
            setDescription(e.target.value)
        }} >
        </textarea>
        <div className='flex gap-[10px]'>
            <div className='flex flex-col gap-[10px]'>
                <span>
                    product category
                </span>
                <select disabled={loading} className='w-[150px] border-[2px] capitalize' required value={category} onChange={(e)=> {
            setCategory(e.target.value)
            }} >
                    <option value={"men"}>
                        men
                    </option>
                    <option value={"women"}>
                        women
                    </option>
                    <option value={"kids"}>
                        kids
                    </option>
                </select>
            </div>
                <div className='flex flex-col gap-[10px]'>
                    <span>
                    product price
                    </span>
                    <input disabled={loading} type='number' placeholder='25' min={0} className='border-[1px] w-[100px]' value={price} onChange={(e)=> {
                    setPrice(e.target.value)
                }} />
                </div>
                <div className='flex flex-col gap-[10px]'>
                <span>
                    sub categry
                </span>
                <select  disabled={loading} className='w-[150px] border-[2px] capitalize' required value={subCategory} onChange={(e)=> {
            setSubCategory(e.target.value)
            }} >
                    <option value={"topwear"}>
                        topwear
                    </option>
                    <option value={"bottomwear"}>
                        bottomwear
                    </option>
                    <option value={"winterwear"}>
                        winterwear
                    </option>
                </select>
            </div>
        </div>
        <h1>
            product sizes
        </h1>
        <div className='flex gap-[10px] uppercase'>
            <span className={`py-[5px] px-[10px] bg-gray-200 cursor-pointer ${sizes.includes("s")?"bg-violet-800 text-white":""}`} onClick={()=> {
                if(!loading)
                removeOrAdd("s")
            }}>
                s
            </span>
            <span className={`py-[5px] px-[10px] bg-gray-200 cursor-pointer ${sizes.includes("m")?"bg-violet-800 text-white":""}`}onClick={()=> {
                if(!loading)
                removeOrAdd("m")
            }}>
                m
            </span>
            <span className={`py-[5px] px-[10px] bg-gray-200 cursor-pointer ${sizes.includes("l")?"bg-violet-800 text-white":""}`}onClick={()=> {
                if(!loading)
                removeOrAdd("l")
            }}>
                l
            </span>
            <span className={`py-[5px] px-[10px] bg-gray-200 cursor-pointer ${sizes.includes("xl")?"bg-violet-800 text-white":""}`}onClick={()=> {
                if(!loading)
                removeOrAdd("xl")
            }}>
                xl
            </span>
            <span className={`py-[5px] px-[10px] bg-gray-200 cursor-pointer ${sizes.includes("xxl")?"bg-violet-800 text-white":""}`}onClick={()=> {
                if(!loading)
                removeOrAdd("xxl")
            }}>
                xxl
            </span>
        </div>
        <div className='flex items-center gap-[10px]'>
            <input disabled={loading} type='checkbox' id="id" checked={bestseller} onChange={()=> {
                if(bestseller) {
                    setBestSeller(false)
                }
                else {
                    setBestSeller(true)
                }
            }}/>
            <label for="id" className=' cursor-pointer'>
                add to bestseller
            </label>
        </div>
        <button disabled={loading} className='capitalize bg-black text-white w-fit py-[5px] px-[50px] ' onClick={()=> {
            add()
        }}>
            {loading?"loading...":"add"}
        </button>
    </div>
  )
}

export default Add ;
