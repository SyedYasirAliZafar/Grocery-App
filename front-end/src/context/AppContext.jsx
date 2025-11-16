import { useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { dummyProducts } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([])

  // fetch all products data

  const fetchProducts = async ()=>{
    setProducts(dummyProducts)
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
    products
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

// ✅ Add this named export
export const useAppContext = () => useContext(AppContext);
