import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hotelsData from "../data/hotels";
import { Link } from "react-router-dom";
import SectionSlider from "../components/SectionSlider";

const Hotels = () => {
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [days, setDays] = useState(1);

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);

  const [filteredHotels, setFilteredHotels] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  const services = [
    { title: "Hotels", path: "/hotels/:id", icon: "🏨" },
  ];

  const stateCityMap = {
    Delhi: [
  "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "North East Delhi",
  "North West Delhi", "South East Delhi", "South West Delhi", "Shahdara", "New Delhi"],
    Maharashtra: ["Mumbai", "Pune"],
    Rajasthan: ["Jaipur", "Udaipur"],
    Karnataka: ["Bangalore"],
    Telangana: ["Hyderabad"],
    Goa: ["Goa"],
    "Tamil Nadu": ["Chennai"],
  };

  // Calculate days
  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
      setDays(diff > 0 ? diff : 1);
    }
  }, [checkIn, checkOut]);

  // Handle children ages
  useEffect(() => {
    setChildrenAges(Array(children).fill(""));
  }, [children]);

  // SEARCH
  const handleSearch = () => {
    const results = hotelsData.filter((hotel) => {
      return (
        (stateName === "" || hotel.state === stateName) &&
        (city === "" || hotel.city === city)
      );
    });

    setFilteredHotels(results);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔝 TOP SEARCH */}
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🏨 Hotel Booking
        </h1>

        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">

          {/* STATE */}
          <div>
            <label className="text-base">State</label>
          <select
            value={stateName}
            onChange={(e) => {
              setStateName(e.target.value);
              setCity("");
            }}
            className="border p-2 rounded w-full"
          >
            <option value="">State</option>
            {Object.keys(stateCityMap).map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          </div>

          {/* CITY */}
          
          <div>
            <label className="text-base">City</label>
            <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">City</option>
            {(stateName ? stateCityMap[stateName] : []).map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
          </div>

          <div>                 
           {/* CHECK-IN */}
          <label className="text-base">Check In : </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border p-2 rounded w-full"
          />
          </div>

          <div>
            {/* CHECK-OUT */}
          <label className="text-base">Check Out :</label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border p-2 rounded w-full"
          />
          </div>

          {/* SEARCH */}
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded px-4 py-2 w-full"
          >
            Search
          </button>
        </div>

        {/* 👨‍👩‍👧 GUEST SECTION */}
        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-4">

          {/* ROOMS */}
          <div>
            <label className="text-sm">Rooms</label>
            <input
              type="number"
              min="1"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* ADULTS */}
          <div>
            <label className="text-sm">Adults</label>
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* CHILDREN */}
          <div>
            <label className="text-sm">Children</label>
            <input
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>
        {/* CHILD AGE INPUT */}
        {children > 0 && (
          <div className="max-w-6xl mx-auto mt-4">
            <p className="text-sm font-medium mb-2">Children Ages</p>

            <div className="grid grid-cols-3 gap-2">
              {childrenAges.map((age, index) => (
                <input
                  key={index}
                  type="number"
                  min="0"
                  max="17"
                  placeholder={`Child ${index + 1} age`}
                  value={age}
                  onChange={(e) => {
                    const newAges = [...childrenAges];
                    newAges[index] = e.target.value;
                    setChildrenAges(newAges);
                  }}
                  className="border p-2 rounded"
                />
              ))}
            </div>
          </div>
        )}
        <div className="bg-white">
          <SectionSlider
        title="Popular Hotels"
        data={hotelsData}
        renderItem={(hotel) => (
          <div onClick={() => navigate(`/hotel/${hotel.id}`, { state: { hotel } })} 
          className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
            <img src={hotel.image} className="h-32 w-full object-cover" />
            <div className="p-3">
              <h3 className="font-semibold">{hotel.name}</h3>
              <p className="text-sm">{hotel.city}</p>
              <p className="text-blue-600 font-bold">₹{hotel.price}</p>
            </div>
          </div>
        )}
      />
        </div>
      </div>

      {/* 🏨 RESULTS */}
      <div className="p-6 max-w-6xl mx-auto">

        {filteredHotels.length > 0 && (
          <h2 className="text-xl font-bold mb-4">
            Available Hotels ({filteredHotels.length})
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                onError={(e) => {e.target.src = "/fallback.jpg"; }}
                className="w-full h-40 object-cover rounded"
              />

              <h3 className="text-lg font-semibold mt-2">
                {hotel.name}
              </h3>

              <p className="text-gray-500">
                {hotel.city}, {hotel.state}
              </p>

              <p className="font-bold">₹{hotel.price} / night</p>

              <p className="text-yellow-500">⭐ {hotel.rating}</p>

              <p className="text-green-600 font-semibold mt-1">
                Total: ₹{hotel.price * days * rooms}
              </p>

              <Link
                to={`/hotel/${hotel.id}`}
                state={{
                  type: "hotel",
                  name: hotel.name,
                  price: hotel.price,
                  checkIn,
                  checkOut,
                  days,
                  rooms,
                  adults,
                  children,
                  childrenAges,
                  totalPrice: hotel.price * days * rooms,
                }}
              >
                <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded">
                  Details
                </button>
              </Link>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Please search hotels by selecting location and dates
          </p>
        )}
      </div>
    </div>
  );
};

export default Hotels;