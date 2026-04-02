import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out");
        navigate("/login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      <h1 className="text-xl font-bold">TravelApp</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/flights" className="hover:underline">Flights</Link>
        <Link to="/bus" className="hover:underline">Bus</Link>
        <Link to="/train" className="hover:underline">Train</Link>
        <Link to="/cab" className="hover:underline">Cab</Link>
        <Link to="/boat" className="hover:underline">Boat</Link>
        <Link to="/hotels" className="hover:underline">Hotels</Link>
        <Link to="/packages" className="hover:underline">Packages</Link>
      </div>

      <div>
        {user ? (
          <>
            <span className="mr-3">👤 {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-3 hover:underline">Login</Link>
            <Link to="/signup" className=" mr-3 hover:underline">Signup</Link>
            <Link to="/about" className="hover:underline">About us</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;