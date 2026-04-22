import { useNavigate } from "react-router-dom";
import SectionSlider from "../components/SectionSlider";

import { allBuses } from "../data/busdata";
import flights from "../data/flightdata";
import hotels from "../data/hotels";
import packages from "../data/packages";

function Home() {
  const navigate = useNavigate();

  const services = [
    { title: "Flights", path: "/flights", icon: "✈️" },
    { title: "Buses", path: "/bus", icon: "🚌" },
    { title: "Packages", path: "/packages", icon: "🌍" },
    { title: "Trains", path: "/train", icon: "🚆" },
    { title: "Cabs", path: "/cab", icon: "🚖" },
    { title: "Hotels", path: "/hotels", icon: "🏨" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="text-center py-12 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-2">Book Your Dream Journey ✈️</h1>
        <p className="text-sm opacity-90">
          Flights, Buses, Hotels & Packages — All in one place
        </p>
      </div>

      {/* 🔹 Services Slider */}
      <SectionSlider
        title="Our Services"
        data={services}
        renderItem={(item) => (
          <div
            onClick={() => navigate(item.path)}
            className="bg-white rounded-xl shadow p-5 text-center cursor-pointer hover:shadow-lg transition"
          >
            <div className="text-3xl">{item.icon}</div>
            <p className="mt-2 font-semibold">{item.title}</p>
          </div>
        )}
      />

      {/* 🔹 Flights Slider */}
      <SectionSlider
        title="Popular Flights"
        data={flights}
        renderItem={(f) => (
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold">{f.from} → {f.to}</h3>
            <p className="text-sm">{f.airline}</p>
            <p className="text-blue-600 font-bold">₹{f.price}</p>
            <p className="text-xs text-gray-500">{f.departure} - {f.arrival} • {f.duration}</p>
          </div>
        )}
      />

      {/* 🔹 Buses Slider */}
      <SectionSlider
        title="Top Bus Routes"
        data={allBuses}
        renderItem={(bus) => (
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h3>{bus.from} → {bus.to}</h3>
            <p className="text-blue-600 font-bold">₹{bus.price}</p>
          </div>
        )}
      />

      {/* 🔹 Hotels Slider */}
      <SectionSlider
        title="Popular Hotels"
        data={hotels}
        renderItem={(hotel) => (
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={hotel.image} className="h-32 w-full object-cover" />
            <div className="p-3">
              <h3 className="font-semibold">{hotel.name}</h3>
              <p className="text-sm">{hotel.city}</p>
              <p className="text-blue-600 font-bold">₹{hotel.price}</p>
            </div>
          </div>
        )}
      />

      {/* 🔹 Packages Slider */}
      <SectionSlider
        title="Best Tour Packages"
        data={packages}
        renderItem={(pkg) => (
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={pkg.image} className="h-32 w-full object-cover" />
            <div className="p-3">
              <h3 className="font-semibold">{pkg.name}</h3>
              <p className="text-sm">{pkg.location}</p>
              <p className="text-blue-600 font-bold">
                ₹{pkg.price} • {pkg.days} Days
              </p>
            </div>
          </div>
        )}
      />

    </div>
  );
}

export default Home;