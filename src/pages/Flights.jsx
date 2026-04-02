import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import flights from "../data/flightdata.js";

const cities = ["Delhi", "Mumbai", "Bangalore", "Goa", "Chennai", "Kolkata", "Hyderabad", "Pune"];
const airlines = ["IndiGo", "AirAsia", "SpiceJet", "Vistara", "GoAir"];

function Flights() {
  const navigate = useNavigate();

  // Search states
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Permanent sections
  const [bookedFlights, setBookedFlights] = useState([]);
  const [bookingCounts, setBookingCounts] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);

  // Filter states
  const [cityFilter, setCityFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [airlineFilter, setAirlineFilter] = useState("");

  const isDisabled = !from || !to;

  // Load from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("bookedFlights") || "[]");
    setBookedFlights(history);

    const counts = JSON.parse(localStorage.getItem("bookingCounts") || "{}");
    setBookingCounts(counts);

    const searches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(searches);
  }, []);

  // Handle search and filtering
  const handleSearch = () => {
    let results = flights.filter(f => 
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

    const newSearch = { from, to };
    const updatedSearches = [newSearch, ...recentSearches.filter(s => !(s.from===from && s.to===to))].slice(0,5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Auto filter whenever filters change
  useEffect(() => {
    if(from && to) handleSearch();
  }, [from, to, cityFilter, maxPrice, ratingFilter, airlineFilter]);

  // Handle booking
  const handleBook = (flight) => {
    const totalPrice = adults * flight.price + children * (flight.price * 0.5);

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

    const newBooked = [flight, ...bookedFlights];
    setBookedFlights(newBooked);
    localStorage.setItem("bookedFlights", JSON.stringify(newBooked));

    const newCounts = { ...bookingCounts, [flight.id]: (bookingCounts[flight.id] || 0) + 1 };
    setBookingCounts(newCounts);
    localStorage.setItem("bookingCounts", JSON.stringify(newCounts));
  };

  // Most booked flights
  const mostBooked = Object.entries(bookingCounts)
    .sort((a,b) => b[1]-a[1])
    .slice(0,3)
    .map(([id]) => flights.find(f => f.id === parseInt(id)))
    .filter(Boolean);

  // Featured flights (first 6)
  const featuredFlights = flights.slice(0,6);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* MAIN SECTION */}
      <div className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-4xl bg-white border shadow-lg rounded-xl p-6 space-y-10">

          {/* Search Section */}
          <div>
            <h1 className="text-2xl font-bold text-center mb-6">✈ Flight Booking</h1>

            {/* From/To */}
            <div className="grid grid-cols-2 gap-4">
              <select value={from} onChange={e=>setFrom(e.target.value)} className="border rounded-lg p-2">
                <option value="">Select From</option>
                {cities.map((c,i) => <option key={i} value={c}>{c}</option>)}
              </select>
              <select value={to} onChange={e=>setTo(e.target.value)} className="border rounded-lg p-2">
                <option value="">Select To</option>
                {cities.map((c,i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Passengers */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="number" min="1" value={adults} onChange={e=>setAdults(Number(e.target.value))} className="border rounded-lg p-2" placeholder="Adults"/>
              <input type="number" min="0" value={children} onChange={e=>setChildren(Number(e.target.value))} className="border rounded-lg p-2" placeholder="Children"/>
            </div>

            <button onClick={handleSearch} className="w-full mt-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">Search</button>
          </div>

          {/* Search Results */}
          {filteredFlights.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Search Results</h2>
              <div className="space-y-4">
                {filteredFlights.map(f => {
                  const totalPrice = adults*f.price + children*(f.price*0.5);
                  return (
                    <div key={f.id} className="border shadow-md rounded-lg p-4">
                      <Card type="flight" from={f.from} to={f.to} price={f.price}/>
                      <p className="text-sm text-gray-700 mt-2">✈ {f.flightNumber} | {f.airline} | {f.duration} | {f.departure} - {f.arrival} | ⭐ {f.rating}</p>
                      <p className="mt-2 text-lg font-bold text-green-600">Total: ₹{totalPrice}</p>
                      <button onClick={()=>handleBook(f)} disabled={isDisabled} className={`w-full mt-3 py-2 rounded-lg text-white font-semibold transition ${isDisabled?"bg-gray-400 cursor-not-allowed":"bg-green-500 hover:bg-green-600"}`}>
                        Book Now
                      </button>
                    </div>
                  );
                })}
                {filteredFlights.length === 0 && !isDisabled && <p className="text-center text-gray-500">No flights found</p>}
              </div>
            </div>
          )}

          {/* Featured, Most Booked, Recently Searched, Booking History */}
          {/* Copy previous sections for consistency */}
          {/* Featured Flights */}
          <div>
            <h2 className="text-xl font-bold mb-4">Featured Flights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredFlights.map(f => (
                <div key={f.id} className="border shadow-md rounded-lg p-3 flex flex-col justify-between hover:shadow-xl transition">
                  <Card type="flight" from={f.from} to={f.to} price={f.price}/>
                  <p className="text-sm text-gray-700 mt-2">✈ {f.flightNumber} | {f.airline} | {f.duration} | {f.departure} - {f.arrival} | ⭐ {f.rating}</p>
                  <p className="mt-1 font-semibold text-green-600 text-lg">₹{f.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Most Booked Flights */}
          <div>
            <h2 className="text-xl font-bold mb-4">Most Booked Flights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mostBooked.length===0 && <p className="text-gray-500">No bookings yet</p>}
              {mostBooked.map(f => (
                <div key={f.id} className="border shadow-md rounded-lg p-3 flex flex-col justify-between hover:shadow-xl transition">
                  <Card type="flight" from={f.from} to={f.to} price={f.price}/>
                  <p className="text-sm text-gray-700 mt-2">✈ {f.flightNumber} | {f.airline}</p>
                  <p className="mt-1 font-semibold text-green-600 text-lg">Booked: {bookingCounts[f.id]}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FILTER SIDEBAR */}
      <div className="w-72 p-6 border-l bg-gray-50 h-screen sticky top-0 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>

        {/* City Filter */}
        <div>
          <label>City</label>
          <select className="w-full border p-2 rounded" value={cityFilter} onChange={e=>setCityFilter(e.target.value)}>
            <option value="">All</option>
            {cities.map((c,i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Max Price */}
        <div>
          <label>Max Price: ₹{maxPrice}</label>
          <input type="range" min="3000" max="6000" step="100" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} className="w-full"/>
        </div>

        {/* Rating */}
        <div>
          <label>Rating</label>
          <select className="w-full border p-2 rounded" value={ratingFilter} onChange={e=>setRatingFilter(Number(e.target.value))}>
            <option value="0">All</option>
            <option value="4">4+</option>
            <option value="4.2">4.2+</option>
            <option value="4.5">4.5+</option>
          </select>
        </div>

        {/* Airline */}
        <div>
          <label>Airline</label>
          <select className="w-full border p-2 rounded" value={airlineFilter} onChange={e=>setAirlineFilter(e.target.value)}>
            <option value="">All</option>
            {airlines.map((a,i)=> <option key={i} value={a}>{a}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Flights;