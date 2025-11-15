import { useNavigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

// ✅ Add this named export
export const useAppContext = () => useContext(AppContext);
