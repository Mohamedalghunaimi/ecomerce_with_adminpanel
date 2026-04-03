import React, { useContext } from 'react'
import { context } from './Provider'
import Add from './Add'
import List from './List'
import Orders from './Orders'

const Contents = () => {
    const {content} = useContext(context)
  return (
    <div className='flex-1 p-[50px]'>
        {content==="add"?<Add />:<></>}
        {content==="list"?<List/>:<></>}
        {content==="order"?<><Orders/></>:<></>}
    </div>
  )
}

export default Contents
