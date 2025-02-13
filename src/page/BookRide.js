import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Calendar, Clock, CreditCard } from "lucide-react";

function LocationPicker({ onSelect, onClose }) {
  const [position, setPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return position ? <Marker position={position} /> : null;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Select Location
        </h2>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler />
        </MapContainer>
        <button
          onClick={() => {
            if (position) {
              onSelect(position);
              onClose();
            }
          }}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
}


const BookRide = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDropoffMap, setShowDropoffMap] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedRideType, setSelectedRideType] = useState("Economy");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");

  // Generate time slots for the next 24 hours
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30, 0, 0); // Round up to the nearest 30 minutes
    const maxTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999); // Set to the end of today (23:59:59.999)

    while (now <= maxTime) {
      const startTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
      const isToday = now <= endOfToday; // Check if the slot is today or tomorrow
      now.setMinutes(now.getMinutes() + 30); // Increment by 30 minutes
      const endTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
      slots.push({
        label: `${startTime} - ${endTime} - ${isToday ? "Today" : "Tomorrow"}`,
        value : {
          startTime: startTime,
          endTime: endTime,
          isToday: isToday
        }
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() =>{
    if(timeSlots){
      setSelectedTime(timeSlots[0].value);
    }
  },[])
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const rideDetails = {
      pickupLocation,
      dropoffLocation,
      selectedTime,
      selectedRideType,
      selectedPaymentMethod,
    };

    console.log("Ride Details:", rideDetails);

    try {
      const userToken = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/book-ride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Retrieve from localStorage
        },
        body: JSON.stringify(rideDetails),
      });

      console.log(`Bearer ${userToken}`);
      
      const result = await response.json();
      if (response.ok) {
        alert("Ride booked successfully!");
        console.log("Ride ID:", result.rideId);
      } else {
        alert("Error booking ride: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while booking the ride.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <h1 className="text-5xl font-bold mb-4">Book a Ride</h1>
        <p className="text-xl mb-6">Get to your destination safely and quickly.</p>

        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-full max-w-md">
          <form onSubmit={handleFormSubmit}>
            {/* Pickup Location */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Pickup Location</label>
              <div className="flex">
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter your pickup location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setShowPickupMap(true)}
                >
                  📍
                </button>
              </div>
            </div>

            {/* Drop-off Location */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Drop-off Location</label>
              <div className="flex">
                <input
                  type="text"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Enter your destination"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setShowDropoffMap(true)}
                >
                  📍
                </button>
              </div>
            </div>

            {/* Time Slot Selection */}
            {/* <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Time</label>
              <div className="flex items-center border border-gray-300 p-3 rounded-lg">
                <Clock className="text-gray-500 mr-2" size={18} />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full focus:ring-0 focus:outline-none"
                >
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

<div className="mb-4">
  <label htmlFor="time-select" className="block text-gray-700 font-semibold mb-2">
    Time
  </label>
  <div className="flex items-center border border-gray-300 p-3 rounded-lg">
    <Clock className="text-gray-500 mr-2" size={18} />
    <select
      id="time-select"
      value={JSON.stringify(selectedTime)} // Convert object to string for controlled select
      onChange={(e) => setSelectedTime(JSON.parse(e.target.value))} // Parse string back to object
      className="w-full focus:ring-0 focus:outline-none bg-transparent"
    >
      {timeSlots.map((slot, index) => (
        <option key={index} value={JSON.stringify(slot.value)}> {/* Store object as string */}
          {slot.label}
        </option>
      ))}
    </select>
  </div>
</div>



            {/* Ride Type Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Ride Type</label>
              <select
                value={selectedRideType}
                onChange={(e) => setSelectedRideType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Economy</option>
                <option>Premium</option>
                <option>Luxury</option>
              </select>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
              <div className="flex items-center border border-gray-300 p-3 rounded-lg">
                <CreditCard className="text-green-500 mr-2" size={18} />
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full focus:ring-0 focus:outline-none"
                >
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Wallet</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm Ride
            </button>
          </form>
        </div>

        <Link to="/" className="mt-6 text-white underline hover:text-gray-200">
          Go Back Home
        </Link>
      </div>

      {/* Location Pickers */}
      {showPickupMap && (
        <LocationPicker
          onSelect={(position) => setPickupLocation(`Lat: ${position.lat}, Lng: ${position.lng}`)}
          onClose={() => setShowPickupMap(false)}
        />
      )}

      {showDropoffMap && (
        <LocationPicker
          onSelect={(position) => setDropoffLocation(`Lat: ${position.lat}, Lng: ${position.lng}`)}
          onClose={() => setShowDropoffMap(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default BookRide;
