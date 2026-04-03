import { Route, Routes } from "react-router-dom"
import Navbar from "./compontents/Navbar"
import Sidebar from "./compontents/Sidebar"
import Contents from "./compontents/Contents"
import { useContext } from "react"
import { context } from "./compontents/Provider"
import Login from "./compontents/Login"
import { ToastContainer } from "react-toastify"


function App() {
  const {token} = useContext(context)
 return(
  <>
  <ToastContainer />
  {token?<>
    <Routes>
    <Route path="/"  element={<><Navbar/>
    <div className="container mx-auto flex">
      <Sidebar />
      <Contents />
    </div>
    </>}/>
  </Routes>
  </>:<>
  <Login />
  
  
  
  </>}
  </>

  )
}

export default App
