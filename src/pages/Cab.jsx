import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { allCabs, cities } from "../data/cabdata";

function Cab() {
  const navigate = useNavigate();
  const panelRef = useRef(null);

  // Search & Filters
  const [cabs, setCabs] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  // Selection States
  const [selectedCabName, setSelectedCabName] = useState(""); // vehicle name
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Seat & Passenger
  const [fullVehicle, setFullVehicle] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [luggage, setLuggage] = useState(0);

  const isDisabled = !from || !to;

  // --- SEARCH CABS ---
  const handleSearch = () => {
    if (!from || !to) {
      setError("Select From & To");
      return;
    }
    if (from === to) {
      setError("From & To cannot be the same");
      return;
    }
    setError("");

    const filtered = allCabs.filter((c) => c.from === from && c.to === to);
    setCabs(filtered);

    // Reset selections
    setSelectedCabName("");
    setAvailableSlots([]);
    setSelectedSlot(null);
    setSelectedSeats([]);
  };

  // --- SELECT VEHICLE ---
  const handleSelectCab = (cabName) => {
    setSelectedCabName(cabName);
    const slots = allCabs.filter(
      (c) => c.name === cabName && c.from === from && c.to === to
    );
    setAvailableSlots(slots);
    setSelectedSlot(null);
    setSelectedSeats([]);
    setFullVehicle(false);

    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // --- SELECT TIME SLOT ---
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setSelectedSeats([]);
  };

  // --- SEAT SELECTION ---
  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < (fullVehicle ? slotMaxSeats() : adults)) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const slotMaxSeats = () => (selectedSlot ? selectedSlot.seatLeft : 0);

  // --- BOOK ---
  const handleBook = () => {
    if (!selectedSlot) {
      setError("Please select a time slot");
      return;
    }

    const childrenCounted = children > 0 ? children : 0;
    const seatsNeeded = adults; // children <6 don't count for seat
    if (!fullVehicle && selectedSeats.length < seatsNeeded) {
      setError("Please select enough seats for all adults");
      return;
    }

    if (!fullVehicle && luggage > adults * 2) {
      setError("Max 2 luggage per person");
      return;
    }

    const totalPrice = fullVehicle
      ? selectedSlot.price * 4
      : adults * selectedSlot.price + children * (selectedSlot.price * 0.5);

    navigate("/checkout", {
      state: {
        type: "cab",
        from,
        to,
        car: selectedSlot.name,
        time: selectedSlot.time,
        fullVehicle,
        seats: selectedSeats,
        adults,
        children,
        luggage,
        totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* SEARCH */}
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">🚕 Cab Booking</h1>

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

        <button
          onClick={handleSearch}
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded"
        >
          Search
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* CAB LIST */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {cabs.map((c) => (
          <div key={c.id} className="border p-4 bg-white rounded shadow">
            <Card type="cab" car={c.name} from={c.from} to={c.to} price={c.price} />
            <p>⭐ {c.rating}</p>
            <button
              onClick={() => handleSelectCab(c.name)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Select Vehicle
            </button>
          </div>
        ))}
      </div>

      {/* SLOT & SEAT PANEL */}
      {selectedCabName && (
        <div ref={panelRef} className="mt-8 bg-white p-6 rounded shadow max-w-3xl mx-auto">

          <h2 className="text-lg font-bold mb-3">
            {selectedCabName} - Select Time Slot
          </h2>

          {/* TIME SLOTS */}
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
                {slot.time} ({slot.seatLeft} seats left)
              </button>
            ))}
          </div>

          {/* SEAT & PASSENGER SELECTION */}
          {selectedSlot && (
            <div>
              {/* FULL VEHICLE */}
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={fullVehicle}
                  onChange={() => setFullVehicle(!fullVehicle)}
                />
                Book Full Vehicle
              </label>

              {/* ADULTS / CHILDREN */}
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
                  <label>Children (Age between 0 to 6)</label>
                  <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="border p-2 w-full"
                  />
                </div>
              </div>

              {/* SEAT SELECTION */}
              {!fullVehicle && (
                <div className="mb-3">
                  <p>Select Seats:</p>
                  <div className="grid grid-cols-6 gap-2 mt-1">
                    {[...Array(selectedSlot.seatLeft)].map((_, idx) => {
                      const seatNum = idx + 1;
                      return (
                        <button
                          key={seatNum}
                          onClick={() => toggleSeat(seatNum)}
                          className={`p-2 border rounded ${
                            selectedSeats.includes(seatNum)
                              ? "bg-blue-500 text-white"
                              : ""
                          }`}
                        >
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LUGGAGE */}
              {!fullVehicle && (
                <div className="mb-3">
                  <label>Luggage</label>
                  <input
                    type="number"
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="border p-2 w-full"
                  />
                  <p className="text-sm text-gray-500">Max 1 big luggage per person</p>
                </div>
              )}

              {/* BOOK BUTTON */}
              <button
                onClick={handleBook}
                className="w-full mt-3 bg-purple-600 text-white py-2 rounded"
              >
                Proceed to Book
              </button>

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cab;