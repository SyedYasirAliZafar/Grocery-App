import { Routes, Route, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import { AppContext } from './context/AppContext'
import MyOrder from './pages/MyOrder'
import Auth from './models/Auth'
import ProductCategory from './pages/ProductCategory'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {
  const { isSeller, showUserLogin } = useContext(AppContext)

  // Better: only true if the path STARTS with /seller
  const location = useLocation()
  const isSellerPath = location.pathname.startsWith('/seller')

  return (
    <div className='text-default min-h-screen'>

      {!isSellerPath && <Navbar />}

      {showUserLogin && <Auth />}
      <Toaster/>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:category/:id' element={<ProductDetails />} />
          <Route path='/product/:category' element={<ProductCategory />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-orders' element={<MyOrder />} />
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
