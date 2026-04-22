import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import flights from "../data/flightdata.js";

const cities = ["Delhi", "Mumbai", "Bangalore", "Goa", "Chennai", "Kolkata", "Hyderabad", "Pune"];
const airlines = ["IndiGo", "AirAsia", "SpiceJet", "Vistara", "GoAir"];

function Flights() {
  const navigate = useNavigate();

  // Search
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Selection
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Passenger
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Filters
  const [cityFilter, setCityFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [airlineFilter, setAirlineFilter] = useState("");

  // Error
  const [error, setError] = useState("");

  // SEARCH
  const handleSearch = () => {
    if (!from || !to) {
      setError("Select From & To");
      return;
    }

    if (from === to) {
      setError("From & To cannot be same");
      return;
    }

    setError("");

    let results = flights.filter(
      f =>
        f.from.toLowerCase() === from.toLowerCase() &&
        f.to.toLowerCase() === to.toLowerCase()
    );

    results = results.filter(f =>
      (cityFilter === "" || f.city === cityFilter) &&
      f.price <= maxPrice &&
      f.rating >= ratingFilter &&
      (airlineFilter === "" || f.airline === airlineFilter)
    );

    setFilteredFlights(results);

    // reset
    setSelectedFlight(null);
  };

  // SELECT FLIGHT
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setError("");
  };

  // BOOK
  const handleBook = (flight) => {
    const totalPrice =
      adults * flight.price + children * (flight.price * 0.5);

    navigate("/checkout", {
      state: {
        type: "flight",
        from: flight.from,
        to: flight.to,
        airline: flight.airline,
        departure: flight.departure,
        arrival: flight.arrival,
        duration: flight.duration,
        flightNumber: flight.flightNumber,
        adults,
        children,
        totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* SEARCH */}
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">✈ Flight Booking</h1>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setError("");
            }}
            className="border p-2"
          >
            <option value="">From</option>
            {cities.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setError("");
            }}
            className="border p-2"
          >
            <option value="">To</option>
            {cities.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded"
        >
          Search
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* RESULTS */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {filteredFlights.length === 0 && from && to && (
          <p className="text-center text-gray-500 col-span-2">
            No flights found
          </p>
        )}

        {filteredFlights.map((f) => (
          <div key={f.id} className="border p-4 bg-white rounded shadow">
            <Card type="flight" from={f.from} to={f.to} price={f.price} />
            <p className="text-sm mt-2">
              ✈ {f.flightNumber} | {f.airline} | {f.duration} | {f.departure} - {f.arrival}
            </p>
            <p>⭐ {f.rating}</p>

            <button
              onClick={() => handleSelectFlight(f)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Select Flight
            </button>
          </div>
        ))}
      </div>

      {/* DETAILS PANEL (LIKE CAB SLOT PANEL) */}
      {selectedFlight && (
        <div className="mt-8 bg-white p-6 rounded shadow max-w-3xl mx-auto">
          <h2 className="text-lg font-bold mb-3">
            {selectedFlight.airline} - Flight Details
          </h2>

          <p className="mb-2">
            ✈ {selectedFlight.flightNumber} | {selectedFlight.departure} - {selectedFlight.arrival}
          </p>

          {/* PASSENGERS */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label>Adults</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => {
                  setAdults(Number(e.target.value));
                  setError("");
                }}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label>Children</label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => {
                  setChildren(Number(e.target.value));
                  setError("");
                }}
                className="border p-2 w-full"
              />
            </div>
          </div>

          {/* TOTAL */}
          <p className="text-lg font-bold text-green-600">
            Total: ₹
            {adults * selectedFlight.price +
              children * selectedFlight.price * 0.5}
          </p>

          {/* BOOK */}
          <button
            onClick={() => handleBook(selectedFlight)}
            className="w-full mt-3 bg-purple-600 text-white py-2 rounded"
          >
            Proceed to Book
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Flights;