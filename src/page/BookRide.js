import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BookRide() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Booking Section */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <h1 className="text-5xl font-bold mb-4">Book a Ride</h1>
        <p className="text-xl mb-6">Get to your destination safely and quickly.</p>

        {/* Booking Form Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-full max-w-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Pickup Location</label>
              <input
                type="text"
                placeholder="Enter your pickup location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Drop-off Location</label>
              <input
                type="text"
                placeholder="Enter your destination"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm Ride
            </button>
          </form>
        </div>

        {/* Link to Home */}
        <Link to="/" className="mt-6 text-white underline hover:text-gray-200">
          Go Back Home
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BookRide;
