import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { allBuses, cities } from "../data/busdata";
import SectionSlider from "../components/SectionSlider";

function Bus() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busType, setBusType] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const [selectedBusName, setSelectedBusName] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deck, setDeck] = useState("lower");

  const today = new Date().toISOString().split("T")[0];
  const t = new Date();
  t.setDate(t.getDate() + 1);
  const tomorrow = t.toISOString().split("T")[0];

  const handleSearch = () => {
    if (!from || !to || !date)
      return setError("Select From, To & Date");

    if (from === to)
      return setError("From & To cannot be same");

    const result = allBuses.filter(
      (b) =>
        b.from === from &&
        b.to === to &&
        (busType === "" || b.type === busType)
    );

    setFilteredBuses(result);

    setSelectedBusName("");
    setAvailableSlots([]);
    setSelectedSlot(null);
    setSelectedSeats([]);
    setError("");
  };

  const handleSelectBus = (name) => {
    setSelectedBusName(name);

    const slots = allBuses.filter(
      (b) => b.name === name && b.from === from && b.to === to
    );

    setAvailableSlots(slots);
    setSelectedSlot(null);
    setSelectedSeats([]);
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setSelectedSeats([]);
  };

  const toggleSeat = (seat) => {
    if (!selectedSlot) return;
    if (selectedSlot.bookedSeats.includes(seat)) return;

    const maxSeats = Number(adults) || 0;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < maxSeats) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handleChildAge = (i, value) => {
    const updated = [...childrenAges];
    updated[i] = Number(value);
    setChildrenAges(updated);
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "ac":
        return "AC Bus";
      case "seater":
        return "Non-AC Seater";
      case "sleeper":
        return "Sleeper";
      case "ac_sleeper":
        return "AC Sleeper";
      default:
        return "Unknown";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "ac":
        return "bg-blue-500";
      case "seater":
        return "bg-gray-500";
      case "sleeper":
        return "bg-purple-500";
      case "ac_sleeper":
        return "bg-indigo-600";
      default:
        return "bg-black";
    }
  };

  const handleBook = () => {
    if (!selectedSlot) return setError("Select slot");
    if (!selectedSeats.length) return setError("Select seats");

    if (adults > selectedSeats.length) {
      setShowPopup(true);
      return;
    }

    if (children > adults) {
      return setError("Children cannot exceed adults");
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
        date,
        time: selectedSlot.time,
        seats: selectedSeats,
        adults,
        children,
        childrenAges,
        totalPrice,
      },
    });
  };

  // ✅ renderSeat helper
  const renderSeat = (seat) => {
    const booked = selectedSlot.bookedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);

    return (
      <button
        key={seat}
        disabled={booked}
        onClick={() => toggleSeat(seat)}
        className={`w-10 h-14 rounded-lg border text-xs flex items-end justify-center
          ${booked ? "bg-gray-300 opacity-50 cursor-not-allowed" : ""}
          ${isSelected ? "border-2 border-blue-500" : ""}
          ${!booked && !isSelected ? "bg-white" : ""}
        `}
      >
        ₹{selectedSlot.price}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* SEARCH */}
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">🚌 Bus Booking</h1>

        <div className="grid grid-cols-2 gap-4">
          <select onChange={(e) => setFrom(e.target.value)} className="border p-2">
            <option value="">From</option>
            {cities.map((c, i) => <option key={i}>{c}</option>)}
          </select>

          <select onChange={(e) => setTo(e.target.value)} className="border p-2">
            <option value="">To</option>
            {cities.map((c, i) => <option key={i}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center border mt-2">
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 p-2"
          />
          <button onClick={() => setDate(today)}>Today</button>
          <button onClick={() => setDate(tomorrow)}>Tomorrow</button>
        </div>

        <button onClick={handleSearch} className="w-full bg-blue-500 text-white mt-3 p-2">
          Search Buses
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* BUS LIST */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {filteredBuses.map((b) => (
          <div key={b.id} className="bg-white p-4 border rounded">

            <Card type="bus" from={b.from} to={b.to} price={b.price} />

            <div className="mt-2">
              <span className={`text-white text-xs px-2 py-1 rounded ${getTypeColor(b.type)}`}>
                {getTypeLabel(b.type)}
              </span>
            </div>

            <button
              onClick={() => handleSelectBus(b.name)}
              className="bg-green-500 text-white mt-3 p-1 w-full"
            >
              Select Bus
            </button>
          </div>
        ))}
      </div>

      {/* SLOT + SEATS */}
      {selectedBusName && (
        <div className="mt-6 bg-white p-4">

          <h2 className="font-bold">{selectedBusName}</h2>

          <div className="flex gap-2 mt-2">
            {availableSlots.map((slot) => (
              <button key={slot.id} onClick={() => handleSelectSlot(slot)}>
                {slot.time}
              </button>
            ))}
          </div>

          {selectedSlot && (
            <>
              <div className="mt-3">
                <label>Adults</label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="border border-blue-300"
                />

                <label>Children</label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setChildren(val);
                    setChildrenAges(Array(val).fill(""));
                  }}
                  className="border border-blue-300"
                />
              </div>

              {/* ✅ EXACT STRUCTURED SEAT UI */}
              <div className="mt-4 flex justify-center">
                <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-4">

                  <div className="text-xs text-gray-500 mb-3">LOWER BERTH</div>

                  <div className="flex gap-6">
                    <div className="flex flex-col gap-4">
                      {[1,2,3,4,5,6].map(renderSeat)}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(renderSeat)}
                    </div>

                    <div className="pt-2">🛞</div>
                  </div>

                  <div className="text-xs text-gray-500 mt-6 mb-3">UPPER BERTH</div>

                  <div className="grid grid-cols-3 gap-4">
                    {[21,22,23,24,25,26,27,28,29,30,31,32,33,34].map(renderSeat)}
                  </div>

                </div>
              </div>

              <button
                onClick={handleBook}
                className="bg-purple-600 text-white w-full mt-4 p-2"
              >
                Book Now
              </button>
            </>
          )}
        </div>
      )}

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4">
            <p>Passengers exceed seats</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      <SectionSlider
        title="Top Bus Routes"
        data={allBuses}
        renderItem={(bus) => (
          <div className="p-3 bg-white">
            {bus.from} → {bus.to}
          </div>
        )}
      />
    </div>
  );
}

export default Bus;




