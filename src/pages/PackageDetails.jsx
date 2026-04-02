import { useParams, useNavigate } from "react-router-dom";
import packages from "../data/packages";

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === Number(id));

  if (!pkg) {
    return <h2>Package not found</h2>;
  }

  const handleBook = () => {
    navigate("/checkout", {
      state: {
        type: "package",
        name: pkg.name,
        price: pkg.price,
        location: pkg.location,
        days: pkg.days
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow">

      <img
        src={pkg.image}
        alt={pkg.name}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">{pkg.name}</h1>

      <p className="text-gray-600 mt-2">{pkg.location}</p>

      <p className="mt-2">{pkg.days} Days Tour</p>

      <h2 className="text-xl font-semibold mt-4">₹{pkg.price}</h2>

      <button
        onClick={handleBook}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book Now
      </button>

    </div>
  );
}

export default PackageDetails;