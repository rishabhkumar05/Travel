import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const allTrains = [
  { from: "Delhi", to: "Chennai", price: 1200 },
  { from: "Kolkata", to: "Bangalore", price: 1500 },
];

// Dropdown options
const cities = ["Delhi", "Chennai", "Kolkata", "Bangalore"];

function Train() {
  const navigate = useNavigate();

  const [trains, setTrains] = useState(allTrains);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const isDisabled = !from || !to; // disable Book button until filled

  const handleSearch = () => {
    const filtered = allTrains.filter(
      (t) =>
        t.from.toLowerCase().includes(from.toLowerCase()) &&
        t.to.toLowerCase().includes(to.toLowerCase())
    );
    setTrains(filtered);
  };

  const handleBook = (totalPrice) => {
    if (isDisabled) return;

    navigate("/checkout", {
      state: {
        type: "Train",
        from,
        to,
        adults,
        children,
        totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white border shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          🚆 Train Booking
        </h1>

        {/* FROM & TO */}
        <div className="grid grid-cols-2 gap-4">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select From</option>
            {cities.map((city, i) => (
              <option key={i} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select To</option>
            {cities.map((city, i) => (
              <option key={i} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* PASSENGERS */}
        <div className="grid grid-cols-2 gap-4 mt-4">

          {/* Adults */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              👨 Adults
            </label>
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Children */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🧒 Children
            </label>
            <input
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="w-full mt-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
        >
          Search
        </button>

        {/* RESULTS */}
        <div className="mt-6 space-y-4">
          {trains.map((t, i) => {
            const totalPrice = adults * t.price + children * (t.price * 0.5);

            return (
              <div key={i} className="border shadow-md rounded-lg p-4">

                <Card type="train" from={t.from} to={t.to} price={t.price} />

                {/* PRICE BREAKDOWN */}
                <p className="text-sm text-gray-700 mt-2">
                  👨 Adults ({adults}) × ₹{t.price} ={" "}
                  <span className="font-semibold">
                    ₹{adults * t.price}
                  </span>
                </p>

                {children > 0 && (
                  <p className="text-sm text-gray-700">
                    🧒 Children ({children}) × ₹{t.price * 0.5} ={" "}
                    <span className="font-semibold">
                      ₹{children * (t.price * 0.5)}
                    </span>
                  </p>
                )}

                <p className="mt-2 text-lg font-bold text-green-600">
                  Total: ₹{totalPrice}
                </p>

                {/* BOOK BUTTON */}
                <button
                  onClick={() => handleBook(totalPrice)}
                  disabled={isDisabled}
                  className={`w-full mt-3 py-2 rounded-lg text-white font-semibold transition
                    ${
                      isDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                  Book Now
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Train;