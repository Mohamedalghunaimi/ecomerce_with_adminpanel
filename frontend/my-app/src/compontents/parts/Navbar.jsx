import { Link, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../../frontend_assets/assets'
import { useContext } from 'react';
import { context } from '../Provider';

const Navbar = () => {
  const nav = useNavigate()
  const location = useLocation();
  const {token,setToken} = useContext(context)
    const {
              setShowSearch,getTotal
          } = useContext(context)

  return (
    <div className='container flex justify-between items-center m-auto py-[10px]'>
        <div className="logo w-[200px]">
            <Link to="/">
            <img src={assets.logo} alt="" className='w-[100%]' />
            </Link>
        </div>
        {token&&
        <ul className='flex gap-[10px] uppercase items-center text-md font-medium text-gray-700'>
          <li className={location.pathname==="/"?"cursor-pointer underline ":" cursor-pointer"} onClick={()=> {
            nav("/")
          }}>
            home
          </li>
          <li  className={location.pathname==="/collection"?"cursor-pointer underline ":" cursor-pointer"} onClick={()=> {
            nav("/collection")
          }}>
            collection
          </li>
          <li  className={location.pathname==="/about"?"cursor-pointer underline ":"cursor-pointer"} onClick={()=> {
            nav("/about")
          }}>
            about
          </li>
          <li className={location.pathname==="/contact"?"cursor-pointer underline ":"cursor-pointer"} onClick={()=> {
            nav("/contact")
          }}>
            contact
          </li>
        </ul>}
        {token&&
        <div className='flex items-center gap-[20px]'>
          <div className='w-[25px]' onClick={()=> {
            setShowSearch(true)
          }}>
            <img src={assets.search_icon} alt="" className='w-[100%] cursor-pointer' />
          </div>
          {!token?<>
          <div className='w-[25px] relative parent' onClick={()=> {
            nav("/login")
          }}><img src={assets.profile_icon} alt=""  className='w-[100%] cursor-pointer' /></div>
          </>:<>
          <div className='w-[25px] relative parent' onClick={()=> {
          }}>
            
              <img src={assets.profile_icon} alt=""  className='w-[100%] cursor-pointer' />
              <ul className='hidden child absolute z-[1000] capitalize bg-gray-100 w-fit shadow-lg rounded-lg bottom-[0px] translate-y-[100%] p-[10px] left-[-80px]'>
              <li className='min-w-[80px] hover:bg-slate-300 p-[5px] cursor-pointer'>
                my profile
              </li>
              <li className='min-w-[80px] hover:bg-slate-300 p-[5px] cursor-pointer' onClick={()=> {
                nav("/orders")
              }}>
                orders
              </li>
              <li className='min-w-[80px] hover:bg-slate-300 p-[5px] cursor-pointer' onClick={()=> {
                setToken("")
                localStorage.setItem("token","")
              }}>
                logout
              </li>
            </ul>

          </div>
          
          
          </>}
          
          <Link to="/cart">
              <div className='w-[25px] relative'>
                <img src={assets.cart_icon} alt=""  className='w-[100%] cursor-pointer' />
                <div className='absolute w-[20px] h-[20px] text-sm text-white flex justify-center items-center rounded-full bottom-[-5px] right-[-5px] bg-black'>
                  {getTotal()}
                </div>
              </div>
          </Link>
          
        

        </div>}
      
    </div>
  )
}

export default Navbar
