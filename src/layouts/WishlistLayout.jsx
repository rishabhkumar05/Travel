import { Outlet } from "react-router-dom";
import { WishlistProvider } from "../context/WishlistContext";

function WishlistLayout() {
  return (
    <WishlistProvider>
      <Outlet />
    </WishlistProvider>
  );
}

export default WishlistLayout;