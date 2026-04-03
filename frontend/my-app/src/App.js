import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './compontents/Home';
import CollectionPage from './compontents/CollectionPage';
import SingleProduct from './compontents/SingleProduct';
import { ToastContainer} from "react-toastify";
import Navbar from './compontents/parts/Navbar';
import Footer from './compontents/parts/Footer';
import Summary from './compontents/parts/Summary';
import CartPage from './compontents/CartPage';
import PlaceOrder from './compontents/PlaceOrder';
import Orders from './compontents/Orders';
import Login from './compontents/Login';
import "./App.css"
import Verify from './compontents/Verify';
function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<><Home /></>} />
      <Route path="/collection" element={<><CollectionPage /></>} />
      <Route path='/product/:id' element={<><SingleProduct/></>} />
      <Route path='/cart' element={<><Navbar /><CartPage/><Summary /><Footer /></>} />
      <Route path='/place-order' element={<><Navbar /><PlaceOrder /> <Summary/> <Footer/></>} />
      <Route path='/orders' element={<><Navbar/><Orders /> <Summary/> <Footer/></>} />
      <Route path='/login' element={<><Navbar/><Login/> <Summary/> <Footer/></>} />
      <Route path='/verify' element={<><Navbar/><Verify /><Summary/><Footer/></>}/>
    </Routes>
    </>
  );
}

export default App;
