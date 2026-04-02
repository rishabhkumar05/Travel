import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-16">

      {/* 🔥 CTA SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 md:px-12 py-10 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Plan Your Dream Trip Today ✈️
            </h2>
            <p className="text-sm opacity-90">
              Get personalized itineraries & best deals from travel experts.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="tel:+912325253555"
              className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition"
            >
              <FaPhoneAlt /> Call Us
            </a>

            <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
              Get Quote
            </button>
          </div>

        </div>
      </div>

      {/* 🧭 MAIN FOOTER */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-3">
            Booking And Travels
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Discover India with curated experiences, custom packages,
            and unforgettable journeys.
          </p>

          <div className="flex gap-4 text-lg">
            <FaFacebookF className="hover:text-white cursor-pointer transition" />
            <FaXTwitter className="hover:text-white cursor-pointer transition" />
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaPinterestP className="hover:text-white cursor-pointer transition" />
            <FaYoutube className="hover:text-white cursor-pointer transition" />
          </div>
        </div>

        {/* DESTINATIONS */}
        <div>
          <h4 className="text-white font-semibold mb-4">Top Destinations</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Gulmarg",
              "Leh Ladakh",
              "Munnar",
              "Rishikesh",
              "Udaipur",
              "Darjeeling",
            ].map((item) => (
              <li key={item}>
                <a
                  href="/"
                  className="hover:text-white hover:pl-1 transition-all duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Taxi Booking",
              "Helicopter Tours",
              "Char Dham Yatra",
              "Kashmir Packages",
              "Honeymoon Packages",
            ].map((item) => (
              <li key={item}>
                <a
                  href="/"
                  className="hover:text-white hover:pl-1 transition-all duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            {[
              "About Us",
              "Contact",
              "Privacy Policy",
              "Terms & Conditions",
              "Blogs",
            ].map((item) => (
              <li key={item}>
                <a
                  href="/"
                  className="hover:text-white hover:pl-1 transition-all duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 📩 NEWSLETTER */}
      <div className="border-t border-gray-800 py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400">
            Subscribe to get travel deals & updates
          </p>

          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-full bg-gray-800 text-sm focus:outline-none"
            />
            <button className="bg-blue-600 px-5 py-2 rounded-r-full text-white text-sm hover:bg-blue-500 transition">
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* 🔻 BOTTOM */}
      <div className="border-t border-gray-800 text-center text-sm py-5 text-gray-500">
        © 2026 Booking And Travels. All rights reserved.
      </div>

      {/* 💬 FLOAT BUTTON */}
      <a
        href="https://wa.me/912325253555"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 px-5 py-3 rounded-full shadow-xl text-white font-semibold hover:bg-green-600 transition"
      >
        WhatsApp Us
      </a>
    </footer>
  );
};

export default Footer;