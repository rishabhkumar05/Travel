import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import hotelsData from "../data/hotels";

const HotelDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();

  // fallback if page refreshed
  const hotel =
    state?.hotel || hotelsData.find((h) => h.id === Number(id));

  if (!hotel) {
    return (
      <p className="text-center mt-10 text-red-500">
        Hotel not found
      </p>
    );
  }
  

  const {
    checkIn,
    checkOut,
    days = 1,
    rooms = 1,
    adults = 1,
    children = 0,
    childrenAges = [],
  } = state || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔹 YOUR SEARCH BAR STYLE (READ ONLY) */}
      <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto bg-white p-4 rounded shadow">

        <div>
          <label className="text-base">State</label>
          <input
            value={hotel.state}
            disabled
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="text-base">City</label>
          <input
            value={hotel.city}
            disabled
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="text-base">Check In :</label>
          <input
            type="date"
            value={checkIn || ""}
            disabled
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="text-base">Check Out :</label>
          <input
            type="date"
            value={checkOut || ""}
            disabled
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
      </div>

      {/* 🔹 GUEST INFO */}
      <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-4 bg-white p-4 rounded shadow">

        <div>
          <label className="text-sm">Rooms</label>
          <input
            value={rooms}
            disabled
            className="border p-2 w-full rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm">Adults</label>
          <input
            value={adults}
            disabled
            className="border p-2 w-full rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm">Children</label>
          <input
            value={children}
            disabled
            className="border p-2 w-full rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm">Days</label>
          <input
            value={days}
            disabled
            className="border p-2 w-full rounded bg-gray-100"
          />
        </div>
      </div>

      {/* 🔹 HOTEL DETAILS */}
      <div className="max-w-6xl mx-auto mt-6 bg-white p-6 rounded shadow">

        <img
          src={hotel.image}
          alt={hotel.name}
          onError={(e) => {e.target.src = "/fallback.jpg"; }}
          className="w-full h-64 object-cover rounded"
        />

        <h1 className="text-2xl font-bold mt-4">
          {hotel.name}
        </h1>

        <p className="text-gray-500">
          {hotel.city}, {hotel.state}
        </p>

        <p className="mt-2">⭐ {hotel.rating}</p>

        <p className="font-bold mt-2">
          ₹{hotel.price} / night
        </p>

        <p className="text-green-600 font-semibold mt-2">
          Total: ₹{hotel.price * days * rooms}
        </p>

        {/* 🔹 EXTRA DATA FROM YOUR DATASET */}
        <p className="mt-3 capitalize">
          Type: <b>{hotel.type}</b>
        </p>

        <p className="mt-1">
          Available Rooms: <b>{hotel.availableRooms}</b>
        </p>

        {/* AMENITIES */}
        <div className="mt-3">
          <p className="font-semibold">Amenities:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {hotel.amenities.map((item, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* BOOK BUTTON */}
        <Link
          to="/checkout"
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
          <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HotelDetails;