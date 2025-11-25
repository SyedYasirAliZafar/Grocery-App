import { useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Cart from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.warn("Invalid cartItems in localStorage. Resetting.");
      localStorage.removeItem("cartItems");
      return {};
    }
  });

  // Sync cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // User to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ---------------------------
  // FETCH USER & MERGE CART
  // ---------------------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        const backendCart = data.user.cart || {};

        // Merge backendCart into local cart
        const mergedCart = { ...cartItems };
        for (const key in backendCart) {
          mergedCart[key] = (mergedCart[key] || 0) + backendCart[key];
        }

        setUser(data.user);
        setCartItems(mergedCart);

        // Sync merged cart to backend
        await axios.post("/api/cart/update", { cartItems: mergedCart });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // CHECK SELLER AUTH
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success ? true : false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Helper to sync cart to backend
  const syncCartToBackend = async (updatedCart) => {
    if (!user) return;
    try {
      await axios.post("/api/cart/update", { cartItems: updatedCart });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // ADD TO CART
  const addToCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);
    toast.success("Added to cart");
    await syncCartToBackend(updatedCart);
  };

  // UPDATE ITEM QUANTITY
  const updateCartItem = async (itemId, quantity) => {
    const updatedCart = { ...cartItems, [itemId]: quantity };
    setCartItems(updatedCart);
    toast.success("Cart Updated");
    await syncCartToBackend(updatedCart);
  };

  // REMOVE ONE QUANTITY FROM CART
  const removeFromCart = async (itemId) => {
    if (!cartItems[itemId]) return;
    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
    if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
    setCartItems(updatedCart);
    toast.success("Removed from Cart");
    await syncCartToBackend(updatedCart);
  };

  // TOTAL ITEMS
  const cartCount = () =>
    Object.values(cartItems).reduce((t, qty) => t + qty, 0);

  // TOTAL PRICE
  const totalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => String(p._id) === String(itemId));
      if (itemInfo) total += cartItems[itemId] * itemInfo.offerPrice;
    }
    return total.toFixed(2);
  };

  // FETCH INITIAL DATA
  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
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
    removeFromCart,
    cartCount,
    totalCartAmount,
    cartItems,
    searchQuery,
    setSearchQuery,
    axios,
    fetchProducts,
    fetchUser,
    fetchSeller,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);
