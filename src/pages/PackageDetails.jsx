import { useParams, useNavigate } from "react-router-dom";
import packages from "../data/packages";
import { useState, useMemo } from "react";
import { useWishlist } from "../context/WishlistContext";

function PackageDetails() {
  const [travelers, setTravelers] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === Number(id));

  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = useMemo(
    () => wishlist.some((item) => item.id === pkg.id),
    [wishlist, pkg.id]
  );

  if (!pkg) return <h2>Package not found</h2>;

  const totalPrice = travelers * pkg.price;

  const handleBook = () => {
    navigate("/checkout", {
      state: {
        type: "package",
        name: pkg.name,
        location: pkg.location,
        days: pkg.days,
        travelers,
        price: pkg.price,
        totalPrice: travelers * pkg.price
        }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow">
      <img
        src={pkg.image || "/fallback.jpg"}
        onError={(e) => (e.target.src = "/fallback.jpg")}
        alt={pkg.name}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">{pkg.name}</h1>

      <p className="text-gray-600 mt-2">📍 {pkg.location}</p>

      <p className="mt-2">{pkg.days} Days Tour</p>

      <h2 className="text-xl font-semibold mt-4">
        ₹{pkg.price} <span className="text-sm text-gray-500">per person</span>
      </h2>

      <div className="mt-4">
        <label className="block font-medium mb-1">
          Number of Travelers
        </label>

        <input
          type="number"
          min="1"
          max="14"
          value={travelers}
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value < 1) value = 1;
            if (value > 14) value = 14;
            setTravelers(value);
          }}
          className="border rounded px-3 py-2 w-24"
        />
      </div>

      <h3 className="mt-2 font-medium">
        Total: ₹{totalPrice}
      </h3>

      <button
        onClick={handleBook}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book Now
      </button>

      <button
        onClick={() => toggleWishlist(pkg)}
        className={`mt-4 ml-3 px-4 py-2 rounded border ${
          isWishlisted
            ? "bg-red-500 text-white border-red-500"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        {isWishlisted ? "❤️ Saved" : "🤍 Wishlist"}
      </button>
      
      <div className="mt-8">
         <h3 className="font-semibold text-lg mb-2">{pkg.description}</h3>
       </div>
      <div className="mt-4">
         <h3 className="font-semibold text-lg mb-2">Highlights</h3>
       
         <ul className="list-disc pl-5 text-gray-700">
           {pkg.highlights?.map((item, index) => (
             <li key={index}>{item}</li>
           ))}
         </ul>
       </div>
       <div className="mt-4">
         <h3 className="font-semibold text-lg mb-2">Exclusions</h3>
                 <ul className="list-disc pl-5 text-gray-700">
           {pkg.exclusions?.map((item, index) => (
             <li key={index}>{item}</li>
           ))}
         </ul>
        </div>
        <div className="mt-4">
         <h3 className="font-semibold text-lg mb-2">Inclusions</h3>
                 <ul className="list-disc pl-5 text-gray-700">
           {pkg.inclusions?.map((item, index) => (
             <li key={index}>{item}</li>
           ))}
         </ul>
        </div>
      <div className="mt-4">
         <h3 className="font-semibold text-lg mb-2">Itinerary</h3>
       
         {pkg.itinerary?.map((day, index) => (
           <p key={index} className="text-gray-700">
             {day}
           </p>
         ))}
       </div>
    </div>
  );
}

export default PackageDetails;