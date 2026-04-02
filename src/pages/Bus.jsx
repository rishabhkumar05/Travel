import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { allBuses, cities } from "../data/busdata";

function Bus() {
  const navigate = useNavigate();

  // SEARCH
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busType, setBusType] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);

  // SELECTION FLOW
  const [selectedBusName, setSelectedBusName] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // PASSENGERS
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // SEATS
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [error, setError] = useState("");

  // 🔍 SEARCH
  const handleSearch = () => {
    if (!from || !to) {
      setError("Select From & To");
      return;
    }
    if (from === to) {
      setError("From & To cannot be same");
      return;
    }

    const result = allBuses.filter(
      (b) =>
        b.from === from &&
        b.to === to &&
        (busType === "" || b.type === busType)
    );

    setFilteredBuses(result);

    // reset
    setSelectedBusName("");
    setAvailableSlots([]);
    setSelectedSlot(null);
    setSelectedSeats([]);
    setError("");
  };

  // 🚌 SELECT BUS TYPE
  const handleSelectBus = (name) => {
    setSelectedBusName(name);

    const slots = allBuses.filter(
      (b) => b.name === name && b.from === from && b.to === to
    );

    setAvailableSlots(slots);
    setSelectedSlot(null);
    setSelectedSeats([]);
  };

  // ⏰ SELECT TIME
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setSelectedSeats([]);
  };

  // 💺 SEAT TOGGLE
  const toggleSeat = (seat) => {
    if (selectedSlot.bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < adults) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  // 🎟 BOOK
  const handleBook = () => {
    if (!selectedSlot) {
      setError("Select a time slot");
      return;
    }

    if (selectedSeats.length < adults) {
      setError("Select seats for all adults");
      return;
    }

    const totalPrice =
      adults * selectedSlot.price +
      children * selectedSlot.price * 0.5;

    navigate("/checkout", {
      state: {
        type: "bus",
        bus: selectedSlot.name,
        from,
        to,
        time: selectedSlot.time,
        seats: selectedSeats,
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
        <h1 className="text-xl font-bold mb-4">🚌 Bus Booking</h1>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2"
          >
            <option value="">From</option>
            {cities.map((c, i) => <option key={i}>{c}</option>)}
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2"
          >
            <option value="">To</option>
            {cities.map((c, i) => <option key={i}>{c}</option>)}
          </select>
        </div>

        {/* BUS TYPE */}
        <select
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
          className="border p-2 w-full mt-3"
        >
          <option value="">All Types</option>
          <option value="ac">AC Bus</option>
          <option value="seater">Simple Bus</option>
          <option value="sleeper">Sleeper</option>
          <option value="ac_sleeper">AC Sleeper</option>
        </select>

        <button
          onClick={handleSearch}
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded"
        >
          Search Buses
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* BUS LIST */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {filteredBuses.map((b) => (
          <div key={b.id} className="border p-4 bg-white rounded shadow">
            <Card type="bus" from={b.from} to={b.to} price={b.price} />
            <p>⭐ {b.rating}</p>

            <button
              onClick={() => handleSelectBus(b.name)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Select Bus
            </button>
          </div>
        ))}
      </div>

      {/* SLOT + SEAT */}
      {selectedBusName && (
        <div className="mt-8 bg-white p-6 rounded shadow max-w-3xl mx-auto">

          <h2 className="font-bold mb-3">
            {selectedBusName} - Select Time
          </h2>

          {/* TIME */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleSelectSlot(slot)}
                className={`p-2 border rounded ${
                  selectedSlot?.id === slot.id
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>

          {/* PASSENGERS + SEATS */}
          {selectedSlot && (
            <div>

              {/* PASSENGERS */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label>Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="border p-2 w-full"
                  />
                </div>

                <div>
                  <label>Children</label>
                  <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="border p-2 w-full"
                  />
                </div>
              </div>

              {/* SEATS */}
              <p>Select Seats:</p>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[...Array(selectedSlot.totalSeats)].map((_, i) => {
                  const seat = i + 1;
                  const isBooked = selectedSlot.bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      onClick={() => toggleSeat(seat)}
                      className={`p-2 rounded 
                        ${isBooked ? "bg-gray-800 text-white" : ""}
                        ${isSelected ? "bg-blue-500 text-white" : "bg-gray-200"}
                      `}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>

              {/* LEGEND */}
              <div className="flex gap-4 mt-3 text-sm">
                <span className="bg-gray-800 text-white px-2">Booked</span>
                <span className="bg-blue-500 text-white px-2">Selected</span>
                <span className="bg-gray-200 px-2">Available</span>
              </div>

              {/* BOOK */}
              <button
                onClick={handleBook}
                className="w-full mt-4 bg-purple-600 text-white py-2 rounded"
              >
                Proceed to Checkout
              </button>

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Bus;