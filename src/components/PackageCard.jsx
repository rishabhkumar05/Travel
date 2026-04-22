import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useMemo } from "react";

function PackageCard({ pkg }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isWishlisted = useMemo(
    () => wishlist.some((item) => item.id === pkg.id),
    [wishlist, pkg.id]
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const handleBook = () => {
    navigate(`/checkout/${pkg.id}`);
  };

  return (
    <div className="bg-white border rounded-xl shadow-md hover:shadow-xl overflow-hidden">
      <img
        src={pkg.image || "/fallback.jpg"}
        alt={pkg.name}
        onError={(e) => (e.target.src = "/fallback.jpg")}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{pkg.name}</h3>

        <p className="text-gray-500">📍 {pkg.location}</p>

        <p className="text-blue-600 font-bold">
          {formatPrice(pkg.price)}
        </p>

        <p className="text-sm text-yellow-500">⭐ {pkg.rating}</p>

        <div className="flex flex-col gap-2 pt-3">
          <button
            onClick={handleBook}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            🧾 Book Now
          </button>

          <div className="flex gap-2">
            <Link
              to={`/packages/${pkg.id}`}
              className="flex-1 text-center bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            >
              Details
            </Link>

            <button
              onClick={() => toggleWishlist(pkg)}
              className={`flex-1 py-1 rounded border ${
                isWishlisted
                  ? "bg-red-500 text-white border-red-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {isWishlisted ? "❤️ Saved" : "🤍 Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;