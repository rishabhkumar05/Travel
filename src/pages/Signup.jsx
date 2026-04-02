import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-purple-100 to-pink-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        <button
          onClick={handleSignup}
          className="w-full py-2 rounded-lg bg-pink-500 text-white font-semibold
                     shadow-md border border-pink-600
                     hover:bg-pink-600 hover:shadow-lg
                     active:scale-95 active:bg-pink-700
                     transition duration-200 ease-in-out"
        >
          Signup
        </button>
      </div>

    </div>
  );
}

export default Signup;