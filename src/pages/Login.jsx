import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-blue-100 to-indigo-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-indigo-500 text-white font-semibold 
                     shadow-md border border-indigo-600
                     hover:bg-indigo-600 hover:shadow-lg 
                     active:scale-95 active:bg-indigo-700
                     transition duration-200 ease-in-out"
        >
          Login
        </button>
      </div>

    </div>
  );
}

export default Login;