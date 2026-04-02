import { Link } from "react-router-dom";

function PackageCard({ pkg }) {
  return (
    <div className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white overflow-hidden">

      <img
        src={pkg.image}
        alt={pkg.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">

        <h3 className="text-lg font-semibold text-gray-800">
          {pkg.name}
        </h3>

        <p className="text-gray-600">{pkg.days} Days</p>

        <p className="text-blue-600 font-bold text-lg">
          ₹{pkg.price}
        </p>

        <div className="flex justify-between pt-2">

          <Link to={`/packages/${pkg.id}`}>
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Details
            </button>
          </Link>

          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
            ❤️ Wishlist
          </button>

        </div>

      </div>
    </div>
  );
}

export default PackageCard;