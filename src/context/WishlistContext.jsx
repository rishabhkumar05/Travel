import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlist,setWishlist] = useState([]);

  const addToWishlist = (pkg) => {
    setWishlist([...wishlist,pkg]);
  };

  return (
    <WishlistContext.Provider value={{wishlist,addToWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);