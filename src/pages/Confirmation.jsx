import { Link } from "react-router-dom";

function Confirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Booking Confirmed
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for booking with us! Your reservation has been successfully processed.
        </p>

        <Link to="/">
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;