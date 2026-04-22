import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Add to wishlist (prevents duplicates)
  const addToWishlist = (pkg) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === pkg.id);
      if (exists) return prev;
      return [...prev, pkg];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle (best UX)
  const toggleWishlist = (pkg) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === pkg.id);

      if (exists) {
        return prev.filter((item) => item.id !== pkg.id);
      } else {
        return [...prev, pkg];
      }
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);