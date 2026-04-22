import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Bus from "./pages/Bus";
import Train from "./pages/Train";
import Cab from "./pages/Cab";
import Boat from "./pages/Boat";
import Hotels from "./pages/Hotels";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import WishlistPage from "./pages/WishlistPage";
import WishlistLayout from "./layouts/WishlistLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HotelDetails from "./pages/HotelDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/*  Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/*  Protected */}
        <Route path="/flights" element={<ProtectedRoute><Flights /></ProtectedRoute>} />
        <Route path="/bus" element={<ProtectedRoute><Bus /></ProtectedRoute>} />
        <Route path="/train" element={<ProtectedRoute><Train /></ProtectedRoute>} />
        <Route path="/cab" element={<ProtectedRoute><Cab /></ProtectedRoute>} />
        <Route path="/boat" element={<ProtectedRoute><Boat /></ProtectedRoute>} />
        <Route path="/hotels" element={<ProtectedRoute><Hotels /></ProtectedRoute>} />
        <Route element={<WishlistLayout />}>
        <Route path="/packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
        <Route path="/packages/:id" element={<ProtectedRoute><PackageDetails /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
        </Route>
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/confirmation" element={<ProtectedRoute><Confirmation /></ProtectedRoute>} />
        <Route path="/hotel/:id" element={<ProtectedRoute><HotelDetails /></ProtectedRoute>} />
       

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;