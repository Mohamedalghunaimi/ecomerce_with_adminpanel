import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom';
import axios from "axios"
export const context = createContext()
const Provider = ({children}) => {
    const [categories,setCategories] = useState([])
    const [types,setTypes] = useState([])
    const [filteredProducts,setFilteredProducts] = useState([])
    const [showSearch,setShowSearch] = useState(false)
    const [cart,setCart] = useState({})
    const [search,setSearch] = useState("")
    const [cartDetails,setCartDetails] = useState([])
    const nav = useNavigate()
    const [token,setToken] = useState("")
    const getCart = async()=> {
                try {
                const {data} = await axios.get("http://localhost:5000/api/cart/getcart",{
                    headers:{
                        token
                    }
                })
                if(data.success) {
                    setCart(data.cartData)
                }
                } catch (error) {
                    toast.error(error.message)
                    
                }
                
        }
        useEffect(()=> {
            getCart()
        },[token,cart])
    const addToCart = async(cartId,size)=> {
        if(!size) {
            return toast.error("please enter the size")
        }
        try {
            const {data} = await axios.post("http://localhost:5000/api/cart/add",{
                itemId:cartId,
                size},{
                    headers :{
                        token
                    }
                })
            if(data.success) {
                toast.success("product is added to cart")
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            //toast.error(error.message)
            console.error(error)
        }

    }
    const getTotal = ()=> {
    let total = 0;
    for(let items of Object.keys(cart)) {
        for(let item of Object.keys(cart[items])) 
        {
            total+=cart[items][item]
        }
    }
    return total;
    }
        const totalPrice = ()=> {
            let totalPrice = 0;
            cartDetails.forEach(element => {
                const product = products.find((ele)=> {
                    if(ele._id===element._id) {
                        return true
                    }
                    return false
                })
                totalPrice+=product.price*element.quantity
            });
            return totalPrice
        }
            const location = useLocation()
    useEffect(()=> {
        if((!token)&&(localStorage.getItem("token"))) {
            setToken(localStorage.getItem("token"))
        }
    },[])
    
    useEffect(()=> {
        if(!token) {
            nav("/login")
        }
        else {
            console.log(location)
            nav(`${location.pathname}${location.search}`)

        }
    },[token,location.pathname])

    useEffect(()=> {
        setShowSearch(false)
    },[location.pathname])
        /*-------------------------------------------------------------------------------- */
        const [products,setProducts] = useState([])
        const getAllProducts = async()=> {
            try {
                const {data} = await axios.get("http://localhost:5000/product/listproduct")
                console.log(data)
                if(data.success) {
                    setProducts(data.products)
                }
            }catch(error) {
                console.log(error)
                toast.error(error.message)
            }

        }
        useEffect(()=> {
            getAllProducts()

        },[])
    const value = {
        categories,setCategories,types,setTypes,filteredProducts,setFilteredProducts,
        setShowSearch,showSearch,cart,setCart,
        search,setSearch,addToCart,getTotal,cartDetails,setCartDetails,totalPrice,token,setToken,
        products
    }

    return (
    <>
    <context.Provider value={value}>
        {children}
    </context.Provider>
    
    </>
    )
}

export default Provider
