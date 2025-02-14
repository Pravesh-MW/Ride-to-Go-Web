import React from "react";
import { FaUserCircle, FaMapMarkerAlt, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";

const User = {
  name: "John Doe",
  email: "john.doe@example.com",
  age: 28,
  location: "New York, USA",
  status: "Active",
  phone: "+1 123 456 7890",
};

const RideInfo = {
  rideId: "RIDE12345",
  pickupLocation: "123 Main St, New York",
  dropoffLocation: "456 Broadway, New York",
  rideDate: "2023-10-15",
  rideTime: "10:00 AM",
};

const ProfileInfo = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-6 p-6">
      {/* User Info Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <FaUserCircle className="text-gray-600 text-3xl" /> {/* User avatar icon */}
          </div>
          <div>
            <p className="font-semibold text-xl text-gray-800">{User.name}</p>
            <p className="text-gray-500 text-sm">{User.email}</p>
          </div>
          <button className="ml-auto p-2 text-gray-600 hover:text-blue-600">
            <FaEdit className="text-xl" /> {/* Edit icon */}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Age:</p>
            <p className="font-semibold text-gray-800">{User.age}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Location:</p>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p className="font-semibold text-gray-800">{User.location}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Status:</p>
            <p className="font-semibold text-gray-800">{User.status}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Email:</p>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-500" />
              <p className="font-semibold text-gray-800">{User.email}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Phone:</p>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-500" />
              <p className="font-semibold text-gray-800">{User.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Info Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="font-semibold text-xl text-gray-800 mb-6">Ride Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Ride ID:</p>
            <p className="font-semibold text-gray-800">{RideInfo.rideId}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Pickup Location:</p>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p className="font-semibold text-gray-800">{RideInfo.pickupLocation}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Dropoff Location:</p>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p className="font-semibold text-gray-800">{RideInfo.dropoffLocation}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Ride Date:</p>
            <p className="font-semibold text-gray-800">{RideInfo.rideDate}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Ride Time:</p>
            <p className="font-semibold text-gray-800">{RideInfo.rideTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;