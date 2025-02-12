import React, { useState } from "react";
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

function BookRide() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDropoffMap, setShowDropoffMap] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rideType, setRideType] = useState("Economy");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30, 0, 0);
    const maxTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    while (now <= maxTime) {
      const startTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      now.setMinutes(now.getMinutes() + 30);
      const endTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      slots.push(`${startTime} - ${endTime}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (
      selectedDate.toDateString() === today.toDateString() ||
      selectedDate.toDateString() === tomorrow.toDateString()
    ) {
      setDate(e.target.value);
    } else {
      alert("Please select today or tomorrow.");
    }
  };






  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <h1 className="text-5xl font-bold mb-4">Book a Ride</h1>
        <p className="text-xl mb-6">
          Get to your destination safely and quickly.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-full max-w-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Location
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter your pickup location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => setShowPickupMap(true)}
                >
                  📍
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Drop-off Location
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder="Enter your destination"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => setShowDropoffMap(true)}
                >
                  📍
                </button>
              </div>
            </div>



            <div className="mb-4 flex space-x-3">
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold mb-2">Date</label>
                <div className="flex items-center border border-gray-300 p-3 rounded-lg">
                  <Calendar className="text-gray-500 mr-2" size={18} />
                  <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="w-full focus:ring-0 focus:outline-none"
                    min={new Date().toISOString().split("T")[0]}
                    max={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold mb-2">Time</label>
                <div className="flex items-center border border-gray-300 p-3 rounded-lg">
                  <Clock className="text-gray-500 mr-2" size={18} />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full focus:ring-0 focus:outline-none"
                  >
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>



            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Ride Type
              </label>
              <select
                value={rideType}
                onChange={(e) => setRideType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Economy</option>
                <option>Premium</option>
                <option>Luxury</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Payment Method
              </label>
              <div className="flex items-center border border-gray-300 p-3 rounded-lg">
                <CreditCard className="text-green-500 mr-2" size={18} />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full focus:ring-0 focus:outline-none"
                >
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Wallet</option>
                </select>
              </div>
            </div>

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

      {showPickupMap && (
        <LocationPicker
          onSelect={(position) =>
            setPickup(`Lat: ${position.lat}, Lng: ${position.lng}`)
          }
          onClose={() => setShowPickupMap(false)}
        />
      )}

      {showDropoffMap && (
        <LocationPicker
          onSelect={(position) =>
            setDropoff(`Lat: ${position.lat}, Lng: ${position.lng}`)
          }
          onClose={() => setShowDropoffMap(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default BookRide;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Calendar, Clock, CreditCard } from "lucide-react";

// function LocationPicker({ onSelect, onClose }) {
//   const [position, setPosition] = useState(null);

//   const MapClickHandler = () => {
//     useMapEvents({
//       click(e) {
//         setPosition(e.latlng);
//       },
//     });
//     return position ? <Marker position={position} /> : null;
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg relative">
//         <button
//           className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
//           onClick={onClose}
//         >
//           ✖
//         </button>
//         <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Location</h2>
//         <MapContainer
//           center={[51.505, -0.09]}
//           zoom={13}
//           style={{ height: "300px", width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <MapClickHandler />
//         </MapContainer>
//         <button
//           onClick={() => {
//             if (position) {
//               onSelect(position);
//               onClose();
//             }
//           }}
//           className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Confirm Location
//         </button>
//       </div>
//     </div>
//   );
// }

// function BookRide() {
//   const [pickup, setPickup] = useState("");
//   const [dropoff, setDropoff] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [rideType, setRideType] = useState("Economy");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");
//   const [showPickupMap, setShowPickupMap] = useState(false);
//   const [showDropoffMap, setShowDropoffMap] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
//         <h1 className="text-5xl font-bold mb-4">Book a Ride</h1>
//         <p className="text-xl mb-6">Get to your destination safely and quickly.</p>

//         <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-full max-w-md">
//           <form>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">Pickup Location</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={pickup}
//                   onChange={(e) => setPickup(e.target.value)}
//                   placeholder="Enter your pickup location"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   type="button"
//                   className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
//                   onClick={() => setShowPickupMap(true)}
//                 >📍</button>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">Drop-off Location</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={dropoff}
//                   onChange={(e) => setDropoff(e.target.value)}
//                   placeholder="Enter your destination"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   type="button"
//                   className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
//                   onClick={() => setShowDropoffMap(true)}
//                 >📍</button>
//               </div>
//             </div>

//             <div className="mb-4 flex space-x-3">
//               <div className="w-1/2">
//                 <label className="block text-gray-700 font-semibold mb-2">Date</label>
//                 <div className="flex items-center border border-gray-300 p-3 rounded-lg">
//                   <Calendar className="text-gray-500 mr-2" size={18} />
//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="w-full focus:ring-0 focus:outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="w-1/2">
//                 <label className="block text-gray-700 font-semibold mb-2">Time</label>
//                 <div className="flex items-center border border-gray-300 p-3 rounded-lg">
//                   <Clock className="text-gray-500 mr-2" size={18} />
//                   <input
//                     type="time"
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                     className="w-full focus:ring-0 focus:outline-none"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">Ride Type</label>
//               <select
//                 value={rideType}
//                 onChange={(e) => setRideType(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>Economy</option>
//                 <option>Premium</option>
//                 <option>Luxury</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
//               <div className="flex items-center border border-gray-300 p-3 rounded-lg">
//                 <CreditCard className="text-green-500 mr-2" size={18} />
//                 <select
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full focus:ring-0 focus:outline-none"
//                 >
//                   <option>Cash</option>
//                   <option>Credit Card</option>
//                   <option>Wallet</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               Confirm Ride
//             </button>
//           </form>
//         </div>
//         <Link to="/" className="mt-6 text-white underline hover:text-gray-200">Go Back Home</Link>
//       </div>
//       <Footer />
//     </div>
//   );
// }
// export default BookRide;
