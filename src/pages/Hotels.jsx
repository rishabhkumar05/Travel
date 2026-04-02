import React, { useState } from "react";
import hotelsData from "../data/hotels";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(10000);
  const [rating, setRating] = useState(0);
  const [days, setDays] = useState(1);

  const filteredHotels = hotelsData.filter((hotel) => {
    return (
      (city === "" || hotel.city === city) &&
      hotel.price <= price &&
      hotel.rating >= rating
    );
  });

  return (
    <div className="flex">
      {/* Hotels List */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Hotels</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="border rounded-xl shadow-md hover:shadow-lg transition p-3"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h3 className="text-lg font-semibold mt-2">{hotel.name}</h3>

              <p className="text-gray-500">{hotel.city}</p>

              <p className="font-medium">₹{hotel.price} / night</p>

              <p className="text-yellow-500">⭐ {hotel.rating}</p>

              <p className="font-semibold mt-2">Total: ₹{hotel.price * days}</p>

              {/* 🔹 Book Now button sending data to Checkout */}
              <Link
                to="/checkout"
                state={{
                  type: "hotel",
                  name: hotel.name,
                  price: hotel.price,
                  days: days,
                  totalPrice: hotel.price * days,
                }}
              >
                <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Book Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Sidebar */}
      <div className="w-72 p-6 border-l bg-gray-50 sticky top-0 h-screen">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>

        {/* City */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">City</label>
          <select
            className="w-full border rounded-lg p-2"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Jaipur">Jaipur</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Max Price: ₹{price}</label>
          <input
            type="range"
            min="1000"
            max="10000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Rating</label>
          <select
            className="w-full border rounded-lg p-2"
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="0">All</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
          </select>
        </div>

        {/* Days */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Days</label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Hotels;