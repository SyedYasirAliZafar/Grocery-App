import { useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);

  // ✅ Cart saved in LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

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

  // UPDATE ITEM QUANTITY IN CART
  const updateCartItem = (itemId, quantity) => {
    let cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // REMOVE FROM CART (1 quantity each time)
  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };

    if (!cartData[itemId]) return;

    cartData[itemId] -= 1;

    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);
    toast.success("Removed from Cart");
  };

  // TOTAL ITEMS IN CART
  const cartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  // TOTAL CART PRICE
  const totalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (p) => String(p._id) === String(itemId)
      );

      if (itemInfo) {
        totalAmount += cartItems[itemId] * itemInfo.offerPrice;
      }
    }

    return totalAmount.toFixed(2);
  };

  // 🟢 SAVE CART TO LOCALSTORAGE ON EVERY CHANGE
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchProducts();
  }, []);

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
    searchQuery,
    setSearchQuery,
    axios,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);
