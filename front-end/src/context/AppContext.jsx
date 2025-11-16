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
  const fetchProducts = async () => {
    setProducts(dummyProducts)
  }

  // ADD TO CART
  const addToCart = (itemId) => {
    let cartData = { ...cartItems };

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // UPDATE CART ITEM
  const updateCartItem = (itemId, quantity) => {
    let cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // TOTAL CART ITEMS
  const cartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  // TOTAL CART AMOUNT
  const totalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
      if (itemInfo) {
        totalAmount += cartItems[itemId] * itemInfo.offerPrice;
      }
    }

    return Math.floor(totalAmount * 1000) / 100;
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };

    if (!cartData[itemId]) return; // item not in cart

    cartData[itemId] -= 1;

    if (cartData[itemId] <= 0) {
      delete cartData[itemId]; // remove item if quantity becomes 0
    }

    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user, setUser,
    isSeller, setIsSeller,
    showUserLogin, setShowUserLogin,
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

export const useAppContext = () => useContext(AppContext);
