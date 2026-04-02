// import { useLocation, Link } from "react-router-dom";

// function Checkout() {
//   const location = useLocation();
//   const data = location.state;

//   if (!data) {
//     return <h2>No booking selected</h2>;
//   }

//   return (
//     <div>
//       <h1>Checkout</h1>

//       <p><b>Type:</b> {data.type}</p>
//       <p><b>From:</b> {data.from}</p>
//       <p><b>To:</b> {data.to}</p>
//       <p><b>Adults:</b> {data.adults}</p>
//       <p><b>Children:</b> {data.children}</p>

//       <h2>Total Price: ₹{data.totalPrice}</h2>

//       <Link to="/confirmation">
//         <button>Confirm Booking</button>
//       </Link>
//     </div>
//   );
// }

// export default Checkout;

import { useLocation, Link } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const data = location.state;

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
        <div className="space-y-2">
          <p><b>From:</b> {data.from}</p>
          <p><b>To:</b> {data.to}</p>
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
       <div className="space-y-2">
           <p><b>Car:</b> {data.car}</p>
           <p><b>From:</b> {data.from}</p>
           <p><b>To:</b> {data.to}</p>
           <p><b>Adults:</b> {data.adults}</p>
           <p><b>Children:</b> {data.children}</p>
           <h2 className="mt-4 text-xl font-semibold">
             Price: ₹{data.totalPrice}
           </h2>
         </div>
       )}
       
      {/* BOAT */}
      {data.type === "boat" && (
        <div className="space-y-2">
          <p><b>Boat:</b> {data.boat}</p>
          <p><b>From:</b> {data.from}</p>
          <p><b>To:</b> {data.to}</p>
          <p><b>Passengers:</b> {data.passengers}</p>
          <h2 className="mt-4 text-xl font-semibold">
            Total Price: ₹{data.totalPrice}
          </h2>
        </div>
      )}

       {/* HOTEL */}
      {data.type === "hotel" && (
        <div className="space-y-2">
          <p><b>Hotel:</b> {data.name}</p>
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
          <h2 className="mt-4 text-xl font-semibold">
            Price: ₹{data.price}
          </h2>
        </div>
      )}

      <div className="mt-6">
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