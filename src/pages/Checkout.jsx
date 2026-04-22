import { useLocation, Link, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10 border rounded shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No booking selected
        </h2>
        <Link to="/" className="mt-4 inline-block">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go Back Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>

      {/* BUS */}
      {data.type === "bus" && (
        <div className="space-y-3">
          <p><b>From:</b> {data.from}</p>
          <p><b>To:</b> {data.to}</p>
          <p><b>Date:</b> {data.date}</p>
          <p><b>Time:</b> {data.time}</p>

          <div>
            <b>Seats:</b>
            <div className="flex gap-2 flex-wrap mt-1">
              {data.seats?.map((seat, i) => (
                <span key={i} className="px-2 py-1 bg-blue-500 text-white rounded">
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <p><b>Adults:</b> {data.adults}</p>
          <p><b>Children:</b> {data.children}</p>

          <h2 className="mt-4 text-xl font-semibold">
            Total Price: ₹{data.totalPrice}
          </h2>
        </div>
      )}

      {/* FLIGHT */}
      {data.type === "flight" && (
        <div className="space-y-2">
          <p><b>Airline:</b> {data.airline}</p>
          <p><b>From:</b> {data.from}</p>
          <p><b>To:</b> {data.to}</p>
          <p><b>Adults:</b> {data.adults}</p>
          <p><b>Children:</b> {data.children}</p>

          <h2 className="mt-4 text-xl font-semibold">
            Total Price: ₹{data.totalPrice}
          </h2>
        </div>
      )}

      {/* TRAIN */}
      {data.type === "train" && (
        <div className="space-y-2">
          <p><b>Train Name:</b> {data.train}</p>
          <p><b>From:</b> {data.from}</p>
          <p><b>To:</b> {data.to}</p>
          <p><b>Class:</b> {data.class}</p>
          <p><b>Passengers:</b> {data.passengers}</p>

          <h2 className="mt-4 text-xl font-semibold">
            Total Price: ₹{data.totalPrice}
          </h2>
        </div>
      )}

      {/* CAB */}
      {data.type === "cab" && (
        <div className="space-y-3">
          <p><b>Car:</b> {data.car}</p>
          <p><b>From:</b> {data.from}</p>
          <p><b>To:</b> {data.to}</p>
          <p><b>Date:</b> {data.date}</p>
          <p><b>Time:</b> {data.time}</p>

          <p><b>Luggage:</b> {data.luggage || 0}</p>

          <h2 className="mt-4 text-xl font-semibold">
            Total Price: ₹{data.totalPrice}
          </h2>
        </div>
      )}

      {/* HOTEL */}
      {data.type === "hotel" && (
        <div className="space-y-2">
          <p><b>Hotel:</b> {data.name}</p>
          <p><b>Check In:</b> {data.checkIn}</p>
          <p><b>Check Out:</b> {data.checkOut}</p>
          <p><b>Rooms:</b> {data.rooms}</p>
          <p><b>Adults:</b> {data.adults}</p>
          <p><b>Children:</b> {data.children}</p>
          <p><b>Days:</b> {data.days}</p>

          <h2 className="mt-4 text-xl font-semibold">
            Total Price: ₹{data.totalPrice}
          </h2>
        </div>
      )}

      {/* PACKAGE */}
      {data.type === "package" && (
        <div className="space-y-2">
          <p><b>Package:</b> {data.name}</p>
          <p><b>Location:</b> {data.location}</p>
          <p><b>Days:</b> {data.days}</p>
          <p><b>Travelers:</b> {data.travelers}</p>
          <p><b>Price:</b> {data.price}</p>

          <h2 className="mt-4 text-xl font-semibold">
            Total Price: ₹{data.totalPrice}
          </h2>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
        >
          Back
        </button>

        <Link to="/confirmation">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Confirm Booking
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;