import { useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { dummyProducts } from "../assets/assets";
import toast from 'react-hot-toast'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({})

  // fetch all products data

  const fetchProducts = async ()=>{
    setProducts(dummyProducts)
  }

  // product add to cart

  const addToCart = (itemId) =>{
    let cartData = structuredClone(cartItems)
    if(cartData[itemId]){
      cartData[itemId] += 1
    }
    else{
      cartData[itemId] = 1
    }
    setCartItems(cartData)
    toast.success("Added to Cart")
  }

  // Update cart items quantity

  const updateCartItem = (itemId, quantity) =>{
    let cartData = structuredClone(cartItems)
    cartData[itemId] = quantity
    setCartItems(cartData)
    toast.success("Cart Updated")
  }


  // Total cart items

  const cartCount = () => {
    let totalCount = 0
    for(const item in cartItems){
      totalCount += cartItems[item]
    }
      return totalCount
  }

  // total cart Ammount

  const totalCartAmount = () => {
    let totalAmount = 0
    for(const items in cartItems){
      let itemInfo  = products.find((product)=>product._id===items)
      if(cartItems[items]>0){
        totalAmount+= cartItems[items]*itemInfo.offerPrice
      }
    }
    return Math.floor(totalAmount * 1000) / 100
  }

  // remove from cart

  const removeFromCart = () => {
    let cartData = structuredClone(cartItems)
    if(cartData[itemId]){
      cartData[itemId -= 1]
      if(cartData[itemId]===0){
        delete cartData[itemId]
      }
      toast.success("Item Removed Successfully")
      setCartItems(cartData)
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    updateCartItem,
    cartCount,
    totalCartAmount,
    removeFromCart,
    cartItems,

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

// ✅ Add this named export
export const useAppContext = () => useContext(AppContext);
