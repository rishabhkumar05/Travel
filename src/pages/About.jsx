import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6">
        About Us
      </h1>

      <p className="text-gray-600 text-center mb-10">
        Welcome to <span className="font-semibold text-black">YourAppName</span> — your smarter way to book anything, anytime.
      </p>

      {/* Our Story */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
        <p className="text-gray-600">
          YourAppName was created with a simple idea: booking should never be complicated.
          We noticed how frustrating it can be to manage appointments across different platforms,
          so we built a solution that makes booking fast, simple, and reliable.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-600">
          Our mission is to simplify the way people book services by providing a seamless,
          user-friendly, and efficient platform.
        </p>
      </section>

      {/* Vision */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
        <p className="text-gray-600">
          We aim to become the most trusted booking platform that connects users with services
          effortlessly and saves valuable time.
        </p>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">✔ Easy and quick bookings</li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">✔ Trusted service providers</li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">✔ Secure payments</li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">✔ Real reviews and ratings</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p className="text-gray-600">
          Have questions or feedback? Reach out at{" "}
          <a
            href="mailto:support@yourapp.com"
            className="text-blue-600 font-medium hover:underline"
          >
            support@yourapp.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default About;