import React, { createContext, useEffect, useState } from 'react'
export const context = createContext()
const Provider = ({children}) => {
    const [content,setContent] = useState("add")
    const [token,setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

    const value = {
        content,setContent,token,setToken
    }
    useEffect(()=> {
        localStorage.setItem("token",token)
    },[token])
  return (<>
    <context.Provider value={value}>
        {children}
    </context.Provider>
    </>
    
  )
}

export default Provider
 