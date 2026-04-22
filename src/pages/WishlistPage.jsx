import { useWishlist } from "../context/WishlistContext";
import PackageCard from "../components/PackageCard";

function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}

    </div>
  );
}

export default WishlistPage;