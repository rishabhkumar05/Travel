import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import allBoats from "../data/allBoats";

const cities = [
  "Goa",
  "Kerala",
  "Mumbai",
  "Chennai",
  "Andaman",
  "Lakshadweep",
];

function Boat() {
  const navigate = useNavigate();

  const [boats, setBoats] = useState(allBoats);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Filters
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(10000);
  const [rating, setRating] = useState(0);

  const isDisabled = !from || !to;

  // 🔍 Filter Logic
  const handleSearch = () => {
    const filtered = allBoats.filter((b) => {
      return (
        (from === "" || b.from === from) &&
        (to === "" || b.to === to) &&
        (city === "" || b.city === city) &&
        b.price <= price &&
        b.rating >= rating
      );
    });

    setBoats(filtered);
  };

  // 🔄 Auto filter (optional but better UX)
  useEffect(() => {
    handleSearch();
  }, [from, to, city, price, rating]);

  const handleBook = (totalPrice) => {
    if (isDisabled) return;

    navigate("/checkout", {
      state: {
        type: "Boat",
        from,
        to,
        adults,
        children,
        totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* MAIN */}
      <div className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">

          <h1 className="text-2xl font-bold text-center mb-6">
            🚤 Boat Booking
          </h1>

          {/* FROM & TO */}
          <div className="grid grid-cols-2 gap-4">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="border p-2 rounded">
              <option value="">From</option>
              {cities.map((c, i) => <option key={i}>{c}</option>)}
            </select>

            <select value={to} onChange={(e) => setTo(e.target.value)} className="border p-2 rounded">
              <option value="">To</option>
              {cities.map((c, i) => <option key={i}>{c}</option>)}
            </select>
          </div>

          {/* PASSENGERS */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              👨 Adults
            </label>
            <input type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              👨 Children
            </label>
            <input type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400" />
          </div>
          </div>

          {/* RESULTS */}
          <div className="mt-6 space-y-4">
            {boats.map((b, i) => {
              const totalPrice = adults * b.price + children * (b.price * 0.5);

              return (
                <div key={i} className="border p-4 rounded-lg shadow">

                  <Card type="boat" from={b.from} to={b.to} price={b.price} />

                  <p>⭐ {b.rating}</p>

                  <p>Total: ₹{totalPrice}</p>

                  <button
                    onClick={() => handleBook(totalPrice)}
                    disabled={isDisabled}
                    className={`w-full mt-2 py-2 text-white rounded ${
                      isDisabled ? "bg-gray-400" : "bg-green-500"
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

      {/* FILTER SIDEBAR */}
      <div className="w-72 p-6 bg-gray-50 border-l">

        <h3 className="text-xl font-semibold mb-4">Filters</h3>

        {/* CITY */}
        <select onChange={(e) => setCity(e.target.value)} className="w-full mb-4 p-2 border rounded">
          <option value="">All Cities</option>
          {cities.map((c, i) => <option key={i}>{c}</option>)}
        </select>

        {/* PRICE */}
        <div className="mb-4">
          <label>Max Price: ₹{price}</label>
          <input
            type="range"
            min="1000"
            max="5000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* RATING */}
        <select onChange={(e) => setRating(Number(e.target.value))} className="w-full p-2 border rounded">
          <option value="0">All Ratings</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>

      </div>
    </div>
  );
}

export default Boat;