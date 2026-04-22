// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Armchair, SteeringWheel } from "lucide-react";
// import Card from "../components/Card";
// import { allCabs, cities } from "../data/cabdata";

// function Cab() {
//   const navigate = useNavigate();
//   const panelRef = useRef(null);

//   // Search & Filters
//   const [cabs, setCabs] = useState([]);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [error, setError] = useState("");

//   // Selection States
//   const [selectedCabName, setSelectedCabName] = useState("");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   // Seat & Passenger
//   const [fullVehicle, setFullVehicle] = useState(false);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [childrenAges, setChildrenAges] = useState([]);
//   const [luggage, setLuggage] = useState(0);

//   useEffect(() => {
//     const newAges = Array(children)
//       .fill("")
//       .map((_, idx) => childrenAges[idx] || "");
//     setChildrenAges(newAges);
//   }, [children]);

//   const handleSearch = () => {
//     if (!from || !to) return setError("Select From & To");
//     if (from === to) return setError("From & To cannot be same");

//     const filtered = allCabs.filter((c) => c.from === from && c.to === to);
//     setCabs(filtered);

//     setSelectedCabName("");
//     setAvailableSlots([]);
//     setSelectedSlot(null);
//     setSelectedSeats([]);
//     setError("");
//   };

//   const handleSelectCab = (cabName) => {
//     setSelectedCabName(cabName);

//     const slots = allCabs.filter(
//       (c) => c.name === cabName && c.from === from && c.to === to
//     );

//     setAvailableSlots(slots);
//     setSelectedSlot(null);
//     setSelectedSeats([]);
//     setFullVehicle(false);

//     setTimeout(() => {
//       panelRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };

//   const handleSelectSlot = (slot) => {
//     setSelectedSlot(slot);
//     setSelectedSeats([]);
//   };

//   const toggleSeat = (seat) => {
//     if (!selectedSlot) return;
//     if (selectedSlot.occupiedSeats?.includes(seat)) return;

//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else {
//       const maxAllowed = fullVehicle
//         ? selectedSlot.seatLeft
//         : adults + childrenAges.filter((a) => a > 6).length;

//       if (selectedSeats.length >= maxAllowed) return;
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleBook = () => {
//     if (!selectedSlot) return setError("Select slot first");

//     navigate("/checkout", {
//       state: {
//         type: "cab",
//         from,
//         to,
//         seats: selectedSeats,
//       },
//     });
//   };

//   const uniqueCabs = [...new Map(cabs.map((c) => [c.name, c])).values()];

//   // ✅ NEW SEAT MAP UI
//   const renderSeats = (totalSeats, occupiedSeats = []) => {
//     const renderSeat = (num) => {
//       const isOccupied = occupiedSeats.includes(num);
//       const isSelected = selectedSeats.includes(num);

//       return (
//         <div
//           key={num}
//           onClick={() => !isOccupied && toggleSeat(num)}
//           className={`flex flex-col items-center cursor-pointer ${
//             isOccupied ? "opacity-40 cursor-not-allowed" : ""
//           }`}
//         >
//           <Armchair
//             className={`w-8 h-8 transition ${
//               isSelected
//                 ? "text-green-500"
//                 : isOccupied
//                 ? "text-gray-400"
//                 : "text-gray-700 hover:text-blue-500"
//             }`}
//           />
//         </div>
//       );
//     };

//     return (
//       <div className="flex flex-col items-center gap-6">
//         {/* Driver Row */}
//         <div className="flex items-center justify-between w-40">
//           <div className="flex flex-col items-center">
//             <Armchair className="w-8 h-8 text-gray-300" />
//           </div>

//           <SteeringWheel className="w-8 h-8 text-black" />

//           {renderSeat(1)}
//         </div>

//         {/* Back Seats */}
//         <div className="grid grid-cols-2 gap-6">
//           {Array.from({ length: totalSeats - 1 }, (_, i) => i + 2).map((seat) =>
//             renderSeat(seat)
//           )}
//         </div>

//         {/* Legend */}
//         <div className="flex gap-6 mt-4 text-sm">
//           <div className="flex items-center gap-1">
//             <Armchair className="w-5 h-5 text-green-500" /> Selected
//           </div>
//           <div className="flex items-center gap-1">
//             <Armchair className="w-5 h-5 text-gray-700" /> Available
//           </div>
//           <div className="flex items-center gap-1">
//             <Armchair className="w-5 h-5 text-gray-400" /> Booked
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6">
//       {/* SEARCH */}
//       <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
//         <div className="flex gap-4">
//           <select onChange={(e) => setFrom(e.target.value)}>
//             <option>From</option>
//             {cities.map((c, i) => (
//               <option key={i}>{c}</option>
//             ))}
//           </select>

//           <select onChange={(e) => setTo(e.target.value)}>
//             <option>To</option>
//             {cities.map((c, i) => (
//               <option key={i}>{c}</option>
//             ))}
//           </select>
//         </div>

//         <button onClick={handleSearch} className="mt-3 bg-blue-500 text-white p-2">
//           Search
//         </button>
//       </div>

//       {/* CAB LIST */}
//       <div className="grid md:grid-cols-2 gap-4 mt-6">
//         {uniqueCabs.map((c) => (
//           <div key={c.id} className="border p-4 rounded">
//             <Card type="cab" car={c.name} />
//             <button
//               onClick={() => handleSelectCab(c.name)}
//               className="bg-green-500 text-white p-2 mt-2 w-full"
//             >
//               Select
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* SLOT + SEATS */}
//       {selectedCabName && (
//         <div ref={panelRef} className="mt-6 p-4 border rounded">
//           <h2>{selectedCabName} - Select Slot</h2>

//           <div className="flex gap-3 mt-3">
//             {availableSlots.map((slot) => (
//               <button
//                 key={slot.id}
//                 onClick={() => handleSelectSlot(slot)}
//                 className="border p-2"
//               >
//                 {slot.time}
//               </button>
//             ))}
//           </div>

//           {selectedSlot && (
//             <div className="mt-6">
//               <h3 className="mb-3">Seat Map</h3>
//               {renderSeats(
//                 selectedSlot.seatLeft,
//                 selectedSlot.occupiedSeats
//               )}

//               <button
//                 onClick={handleBook}
//                 className="mt-6 bg-purple-600 text-white p-2 w-full"
//               >
//                 Book
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cab;

import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { Armchair, Luggage } from "lucide-react";
import { GiSteeringWheel } from "react-icons/gi";
import { allCabs, cities } from "../data/cabdata";

function Cab() {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const location = useLocation();
  const adultRef = useRef(null);

  // SEARCH
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cabs, setCabs] = useState([]);
  const [error, setError] = useState("");
  const [date, setDate]= useState("");

  // SELECTION
  const [selectedCabName, setSelectedCabName] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // STEP 1 PASSENGER COUNT
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  // STEP 2 PASSENGER DETAILS
  const [adults, setAdults] = useState([
    { name: "", age: "", gender: "", street:"", other:"", city:"" }
  ]);

  const [childrenAges, setChildrenAges] = useState([]);
  const [luggage, setLuggage] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  
  //useeffect because of adult details 
  useEffect(() => {
  setAdults((prev) => {
    const updated = [...prev];

    while (updated.length < adultsCount) {
      updated.push({
        name: "",
        age: "",
        gender: "",
        street: "",
        other: "",
        city: ""
      });
    }

    return updated.slice(0, adultsCount);
  });


if (location.state?.step === "adultDetails") {
    setTimeout(() => {
      adultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }}, [adultsCount, location.state]);

  // SEARCH
  const handleSearch = () => {
    if (!from || !to || !date) return setError("Select From To and Date");

    const filtered = allCabs.filter(
      (c) => c.from === from && c.to === to
    );

    setCabs(filtered);
    setSelectedCabName("");
    setAvailableSlots([]);
    setSelectedSlot(null);
    setSelectedSeats([]);
    setError("");
  };

  // CAB SELECT
  const handleSelectCab = (name) => {
    setSelectedCabName(name);

    const slots = allCabs.filter((c) => c.name === name);
    setAvailableSlots(slots);

    setSelectedSlot(null);
    setSelectedSeats([]);

    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // SLOT SELECT
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setSelectedSeats([]);
  };

  // SEAT TOGGLE
  const toggleSeat = (seat) => {
    if (!selectedSlot) return;
    if (selectedSlot.occupiedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // ADULT CHANGE
  const handleAdultChange = (i, field, value) => {
    const updated = [...adults];
    if(!updated){
      updated[i] ={name:"", age:"", gender:"", street:"", other:"", city:""};
    }
    updated[i][field] = value;
    setAdults(updated);
  };

  // CHILD AGE
  const handleChildAge = (i, value) => {
    const age = Number(value);
    if (age > 8) return setError("Child age cannot exceed 8");

    const updated = [...childrenAges];
    updated[i] = age;
    setChildrenAges(updated);
  };

  // BOOK
  const handleBook = () => {
    if (!selectedSlot) return setError("Select slot");
    if (!selectedSeats.length) return setError("Select seats");

    if (adultsCount > selectedSeats.length) {
      setShowPopup(true);
      return;
    }

    if (luggage > adultsCount) {
      return setError("Luggage cannot exceed adults");
    }

    navigate("/checkout", {
      state: {
        type: "cab",
        from,
        to,
        date,
        car: selectedCabName,
        time: selectedSlot.time,
        seats: selectedSeats,
        adults,
        childrenAges,
        luggage
      }
    });
  };

  const uniqueCabs = [...new Map(cabs.map((c) => [c.name, c])).values()];

  // SEATS UI
  const renderSeats = (layout, occupied) => (
    <div className="flex flex-col gap-3 mt-3">
      {layout.map((row, i) => (
        <div key={i} className="flex justify-center flex-wrap gap-4">
          {row.map((seat) => {
            if (seat === "D")
              return <div key={Math.random()} className="w-8 h-8 flex items-center justify-center" >
                   <GiSteeringWheel size={20} />
              </div>;

            if (seat === "gap")
              return <div key={Math.random()} className="w-8" />;

            const isBooked = occupied.includes(seat);
            const isSelected = selectedSeats.includes(seat);

            return (
              <button
                key={seat}
                onClick={() => !isBooked && toggleSeat(seat)}
                className={`w-10 h-10 flex items-center rounded ${
                  isBooked
                    ? "bg-gray-400"
                    : isSelected
                    ? "bg-green-500 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
              >
                <Armchair size={20} />
                {seat}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-6">
        🚕 Cab Booking
      </h1>

      {/* SEARCH */}
      <div className=" h-54 max-w-xl mx-auto mt-10 bg-white p-4 rounded shadow border-amber-300">
        <div className="flex h-1/3 gap-3">
          <select className="rounded border text-2xl w-full border-blue-400" onChange={(e) => setFrom(e.target.value)}>
            <option value="">From</option>
            {cities.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <select className="rounded border text-2xl w-full border-blue-400" onChange={(e) => setTo(e.target.value)}>
            <option value="">To</option>
            {cities.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
          </div>
          <div className="mt-3 flex items-center border border-blue-400 rounded overflow-hidden h-12">
           <input
             type="date"
             value={date}
             min={today}
             onChange={(e) => setDate(e.target.value)}
             className="flex-1 h-full px-3 text-lg outline-none"
           />
         
           <button
             onClick={() => setDate(today)}
             className="h-full px-4  hover:bg-gray-200 "
           >
             Today
           </button>
         
           <button
             onClick={() => {
               const t = new Date();
               t.setDate(t.getDate() + 1);
               setDate(t.toISOString().split("T")[0]);
             }}
             className="h-full px-4  hover:bg-gray-200 "
           >
             Tomorrow
           </button>
         </div>
        

        <button
          onClick={handleSearch}
          className="mt-1 h-10 bg-blue-600 text-white w-full p-2 rounded"
        >
          Search
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* VEHICLE SECTION */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {uniqueCabs.map((c) => (
          <div
            key={c.id}
            onClick={() => handleSelectCab(c.name)}
            className={`p-4 border rounded cursor-pointer transition  ${
              selectedCabName === c.name
                ? "bg-blue-700 text-white scale-105"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <h3 className="font-bold">{c.name}</h3>
            <p>₹{c.price}</p>
            <h4>Total Seat : {c.totalSeats}</h4>
            <h4></h4>
          </div>
        ))}
      </div>

      {/* SLOT SECTION */}
      {selectedCabName && (
        <div ref={panelRef} className="mt-6 bg-white p-4 rounded shadow">

          <h2 className="font-bold mb-3">{selectedCabName} - Slots</h2>

          <div className="flex gap-2 flex-wrap">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleSelectSlot(slot)}
                className={`border p-2 rounded ${
                  selectedSlot?.id === slot.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {slot.time}
                <div className="text-xs text-gray-600">
                  {slot.seatLeft} seats left
                </div>
              </button>
            ))}
          </div>

          {/* PASSENGER COUNT */}
          {selectedSlot && (
            <div className="mt-6 border p-3 rounded bg-gray-50">

              <h3 className="font-semibold mb-2">
                Passenger Count
              </h3>

              <h4>Adult</h4>
              <input
                type="number"
                value={adultsCount}
                onChange={(e) => {
                  let value = e.target.value;
                   // allow empty input (important for manual editing)
                    if (value === "") {
                      setAdultsCount("");
                      return;
                    }
                  
                    value = Number(value);
                  
                    if (value < 1) value = 1;
                  
                    const availableSeats = selectedSlot
                      ? selectedSlot.seatLeft + selectedSeats.length
                      : 1;
                  
                    if (value > availableSeats) {
                      value = availableSeats;
                      setError("Adults cannot exceed available seats");
                    }
                  
                    setAdultsCount(value);
                  }}
                className="border p-2 w-full mb-2"
              />

              <h4>Children (child &lt; 8)</h4>
              <input
                type="number"
                min="0"
                max="7"
                value={childrenCount}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 0) value = 0;
                  if (value > 7) value = 7;
                  setChildrenCount(value);
                  setChildrenAges(Array(value).fill(""));
                }}
                className="border p-2 w-full"
              />

              {/* ✅ ADDED CHILD AGE INPUT (ONLY ADDITION) */}
              {childrenCount > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold">Children Age</h4>

                  {Array.from({ length: childrenCount }).map((_, i) => (
                    <input
                      key={i}
                      type="number"
                      placeholder={`Child ${i + 1} Age`}
                      value={childrenAges[i] || ""}
                      onChange={(e) => handleChildAge(i, e.target.value)}
                      className="border p-2 w-full mt-2"
                    />
                  ))}
                </div>
              )}

            </div>
          )}

          {/* SEATS */}
          {selectedSlot && (
            <>
              <h3 className="mt-4  font-semibold">Seat Selection</h3>
              <div className="flex justify-center items-center">
              {renderSeats(selectedSlot.layout, selectedSlot.occupiedSeats)}
              </div>
            </>
          )}

          {/* LUGGAGE */}
          {selectedSlot && (
            <div>
              <h4>Luggage (Each Person carry one bag)</h4>
              <input
                type="number"
                value={luggage}
                onChange={(e) => setLuggage(Number(e.target.value))}
                className="border p-2 w-full"
              />
            </div>
          )}

          {/* ADULT DETAILS */}
          {selectedSlot && (
            <div ref={adultRef} className="mt-4 border p-3 rounded bg-gray-50">
              <h3 className="font-semibold mb-2">Adult Details</h3>

              {Array.from({ length: adultsCount }).map((_, i) => (
                <div key={i} className="mb-3 p-2 border rounded">
                  
                  
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder={`Adult ${i + 1} Name`}
                    value={adults[i]?.name || ""}
                    onChange={(e) =>
                      handleAdultChange(i, "name", e.target.value)
                    }
                    className="border p-2 w-full mb-2"
                  />

                  <label>Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={adults[i]?.age || ""}
                    onChange={(e) =>
                      handleAdultChange(i, "age", e.target.value)
                    }
                    className="border p-2 w-full mb-2"
                  />

                  <label>Gender</label>
                  <select
                    value={adults[i]?.gender || ""}
                    onChange={(e) =>
                      handleAdultChange(i, "gender", e.target.value)
                    }
                    className="border p-2 w-full"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <label>Pickup Address</label>
                  <input
                    type="text"
                    placeholder={"Street/Landmark"}
                    value={adults[i]?.street || ""}
                    onChange={(e) =>
                      handleAdultChange(i, "street", e.target.value)
                    }
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder={"Other (Optional)"}
                    value={adults[i]?.other || ""}
                    onChange={(e) =>
                      handleAdultChange(i, "other", e.target.value)
                    }
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder={"City / Area"}
                    value={adults[i]?.city || ""}
                    onChange={(e) =>
                      handleAdultChange(i, "city", e.target.value)
                    }
                    className="border p-2 w-full mb-2"
                  />


                </div>
              ))}
            </div>
          )}

          {/* BOOK BUTTON */}
          {selectedSlot && (
            <button
              onClick={handleBook}
              className="mt-5 bg-purple-600 text-white w-full p-2 rounded"
            >
              Book Now
            </button>
          )}
        </div>
      )}

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p className="mb-3">Passengers exceed seats</p>
            <button onClick={() => setShowPopup(false)}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cab;