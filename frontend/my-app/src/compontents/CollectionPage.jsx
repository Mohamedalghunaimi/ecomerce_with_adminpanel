import { useContext } from 'react'
import Navbar from './parts/Navbar'
import Collections from './parts2/Collections'
import Filters from './parts2/Filters'
import Search from './parts2/Search'
import { context } from './Provider'
import { useLocation } from 'react-router-dom'

const CollectionPage = () => {
   
    const {showSearch} = useContext(context)
    const location = useLocation()
    
  return (
      <>
      <Navbar />
      {location.pathname==="/collection"&&showSearch?<Search />:<></>}
      <div className='container m-auto flex gap-[20px] flex-wrap '>
        <Filters />
        <Collections />
      </div>
      </>
  )
}

export default CollectionPage
