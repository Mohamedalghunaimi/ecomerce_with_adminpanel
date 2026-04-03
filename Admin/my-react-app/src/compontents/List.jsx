import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { context } from './Provider'
import { toast } from 'react-toastify'

const List = () => {
    const [list,setList] = useState([])
    const {token} = useContext(context)
    const fetchList = async()=> {
        try {
            const {data} = await axios.get("http://localhost:5000/product/listproduct")
            if(data.success) {
                setList(data.products)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const remove = async(id)=> {
        try {
            const {data} = await axios.post("http://localhost:5000/product/removeproduct",{id},{
                headers :{
                    token
                }
            })
            if(data.success) {
                toast.success(data.message)
                fetchList()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
        
    }
    useEffect(()=> {
        fetchList()
    },[])
  return list.length ?(
    <div className=''>
        <table className='w-[100%] text-center'>
            <thead className='capitalize text-xl font-bold'>
                <tr>
                    <td>
                        image
                    </td>
                    <td>
                        name
                    </td>
                    <td>
                        price
                    </td>
                    <td>
                        category
                    </td>
                    <td>
                        subCategory
                    </td>
                    <td>
                        remove
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((ele)=> {
                        return (<>
                        <tr>
                            <td>
                                <img src={ele.image[0]} className='w-[100px] h-[100px] mx-auto' alt=""/>
                            </td>
                            <td>
                                {ele.name}
                            </td>
                            <td>
                                {ele.price}$
                            </td>
                            <td>
                                {ele.category}
                            </td>
                            <td>
                                {ele.subCategory}
                            </td>
                            <td className='font-bold text-3xl cursor-pointer' onClick={()=> {
                                remove(ele._id)
                            }}>
                                X 
                            </td>
                        </tr>
                        </>)
                    })
                }
            </tbody>
        </table>
    </div>
    ):(<>
    <h1 className='text-center capitalize text-pretty text-2xl font-semibold'>
        no products yet
    </h1>
    </>)
}

export default List
