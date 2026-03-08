import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  //count of cart item and wishlists
  const [cartItemsCount, setCartItemsCount] = useState(() => {
    const storedCount = localStorage.getItem("cartItemsCount");
    return storedCount ? Number(storedCount) : 0;
  });
  
  const [wishlistCount, setWishlistCount]=useState(0)


  // TEMP CART (before login)
  const [tempCart, setTempCart] = useState(() => {
    const storedCart = localStorage.getItem("tempCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  

  //wishlists
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("allWishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
  
 


  const navigate = useNavigate();

  // Get logged-in user
  const getLoginUser = async () => {
    try {
      const res = await fetch(`${url}/auth/user`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Token
  const haveToken = user?.isEmailVerified === true;


  // Logout functionality
  const logoutHandler = async () => {
    try {
      const res = await fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Logged Out Successfully");
        setCartItemsCount(0)
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  useEffect(() => {
    getLoginUser();
  }, []);

  // temp cart
  const addToTempCart = (productId, quantity) => {
    setTempCart((prev) => {
      const exist = prev.find((item) => item.productId === productId);

      if (exist) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { productId, quantity }];
    });
  };

  

  const clearTempCart = () => {
    setTempCart([]);
    localStorage.removeItem("tempCart");
  };

  

  /* ===========================
     SAVE GUEST CART TO LOCAL STORAGE
  ============================ */
  useEffect(() => {
    if (!haveToken) {
      localStorage.setItem("tempCart", JSON.stringify(tempCart));
    }
  }, [tempCart, haveToken]);

  /* ===========================
     SYNC GUEST CART AFTER LOGIN
  ============================ */
  useEffect(() => {
    const syncTempCart = async () => {
      if (!haveToken || tempCart.length === 0) return;

      for (const item of tempCart) {
        await fetch(`${url}/api/client/cart/add`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }

      clearTempCart();
    };

    syncTempCart();
  }, [haveToken]);

  /* ===========================
     WISHLISTS HANDLER
  ============================ */
  const handleWishlist = (id) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
  
      if (exists) {
        toast.info("Removed from wishlist");
        return prev.filter((item) => item !== id);
      } else {
        toast.success("Added to wishlist");
        return [...prev, id];
      }
    });
  };
  

  useEffect(() => {
    setWishlistCount(wishlist.length)
    localStorage.setItem("allWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cartItemsCount", cartItemsCount);
  }, [cartItemsCount]);
  
  

  return (
    <AppContext.Provider
      value={{
        user,
        haveToken,
        loading,
        categoryName,
        setCategoryName,
        productId,
        setProductId,
        quantity,
        setQuantity,
        tempCart, cartItemsCount, setCartItemsCount,
        addToTempCart,
        clearTempCart,
        wishlist,setWishlist,handleWishlist, wishlistCount, setWishlistCount,
        setUser,
        getLoginUser,
        logoutHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
