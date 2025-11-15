import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import MyOrder from './pages/MyOrder'
import Auth from './models/Auth'

function App() {

  const {isSeller, showUserLogin} = useContext(AppContext)
  const isSellerPath = useLocation().pathname.includes('seller')
  

  return (
    <div>    
      {isSellerPath ? null : <Navbar/>}
      {
    showUserLogin ? <Auth/> : null
      }
    <div>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/products' element = {<Products/>}/>
      <Route path='/product/:id' element = {<ProductDetails/>}/>
      <Route path='/cart' element = {<Cart/>}/>
      <Route path='/my-orders' element = {<MyOrder/>}/>
    </Routes>
    </div>
    </div>

  )
}

export default App
