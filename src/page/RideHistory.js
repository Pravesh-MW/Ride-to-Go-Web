import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Car,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import moment from "moment";
import MyMapComponent from "../components/MyMapComponent";

function RideHistory() {
  const rideHistory = [
    {
      id: "RA1025",
      date: "Feb 10, 2025",
      pickup: "Downtown",
      dropoff: "Airport",
      pickupTime: "10:30 AM",
      dropoffTime: "11:10 AM",
      distance: "15 miles",
      duration: "40 min",
      fare: "$20",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "RA1024",
      date: "Feb 8, 2025",
      pickup: "City Mall",
      dropoff: "Train Station",
      pickupTime: "3:00 PM",
      dropoffTime: "3:35 PM",
      distance: "10 miles",
      duration: "35 min",
      fare: "$15",
      paymentMethod: "Cash",
      status: "Canceled",
    },
    {
      id: "RA1023",
      date: "Feb 5, 2025",
      pickup: "University",
      dropoff: "Home",
      pickupTime: "6:15 PM",
      dropoffTime: "6:45 PM",
      distance: "8 miles",
      duration: "30 min",
      fare: "$12",
      paymentMethod: "Debit Card",
      status: "Ongoing",
    },
  ];

  const [rideHistory1, setRideHistory1] = useState([]);

  useEffect(() => {
    const fetchRideHistory1 = async () => {
      const response = await fetch("http://localhost:5000/ride-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      console.log(data.rideHistory);

      setRideHistory1(data);
    };
    fetchRideHistory1();
  }, []);

  const [expandedRide, setExpandedRide] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpand = (rideId) => {
    setExpandedRide(expandedRide === rideId ? null : rideId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <MyMapComponent />
      <RideHistory1 />
      <Footer />
    </div>
  );
}

export default RideHistory;

const RideHistory1 = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [expandedRide, setExpandedRide] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  // Toggle expanded view
  const toggleExpand = (rideId) => {
    setExpandedRide(expandedRide === rideId ? null : rideId);
  };

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch ride history (Replace with API call)
  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/ride-history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data);
        console.log(data.rideHistory);

        // Convert Firestore timestamp to readable date
        const formattedData = data.rideHistory.map((ride) => ({
          ...ride,
          date: new Date(ride?.createdAt._seconds * 1000).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          ),
        }));

        console.log(formattedData);
        setRideHistory(formattedData);
      } catch (error) {
        console.error("Error fetching ride history:", error);
      }
    };

    fetchRideHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Ride History
          </h1>
          <p className="text-lg md:text-xl mb-6">
            View your past rides and track your expenses.
          </p>
          <Link
            to="/book-ride"
            className="bg-white text-blue-600 font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Book a New Ride
          </Link>
        </div>
      </div>

      <div className="flex justify-center my-10 px-4">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Recent Rides
          </h2>

          <div className="space-y-6">
            {rideHistory.length > 0 ? (
              rideHistory.map((ride) => (
                <div
                  key={ride?.id}
                  className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-200 overflow-hidden"
                >
                  <div className="absolute top-1/2 left-0 w-6 h-6 bg-gray-100 rounded-full transform -translate-y-1/2 -translate-x-1/2 border border-gray-400"></div>
                  <div className="absolute top-1/2 right-0 w-6 h-6 bg-gray-100 rounded-full transform -translate-y-1/2 translate-x-1/2 border border-gray-400"></div>

                  <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div className="flex flex-col items-start space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-gray-500" size={18} />
                        <p className="font-semibold text-gray-700">
                          {moment(ride?.date).format("DD-MM-YYYY")}
                        </p>
                      </div>
                      <div className="text-gray-500 text-sm">
                        <p>
                          <strong>Slot:</strong> {ride?.slot?.startTime} -{" "}
                          {ride?.slot?.endTime}
                        </p>
                        {ride?.slot?.isToday && (
                          <p className="text-blue-500 font-medium">Today</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-green-500" size={18} />
                      <p className="font-bold text-green-600">{ride?.fare}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">
                      Ride ID:{" "}
                      <span className="font-semibold text-gray-700">
                        {ride?.rideId}
                      </span>
                    </p>
                    <div className="flex items-center space-x-2">
                      {ride?.status === "Completed" && (
                        <CheckCircle className="text-green-500" size={18} />
                      )}
                      {ride?.status === "Canceled" && (
                        <XCircle className="text-red-500" size={18} />
                      )}
                      {ride?.status === "Ongoing" && (
                        <Car className="text-blue-500" size={18} />
                      )}
                      <p
                        className={`font-bold ${
                          ride?.status === "Completed"
                            ? "text-green-600"
                            : ride?.status === "Canceled"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {ride?.status}
                      </p>
                    </div>
                  </div>

                  {isLargeScreen ? (
                    <div className="">
                      <div className="mt-4 flex items-center space-x-4">
                        <div className="flex-1 text-center">
                          <p className="text-gray-500 text-sm">Pickup</p>
                          <div className="flex items-center justify-center text-blue-600 font-bold text-lg">
                            <MapPin className="mr-2" size={20} />
                            {ride?.pickupLocation}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            <Clock size={14} className="mr-1 inline" />{" "}
                            {ride?.pickup}
                          </p>
                        </div>

                        <div className="flex-1 border-dashed border-t-2 border-gray-400"></div>

                        <div className="flex-1 text-center">
                          <p className="text-gray-500 text-sm">Drop-off</p>
                          <div className="flex items-center justify-center text-purple-600 font-bold text-lg">
                            <MapPin className="mr-2" size={20} />
                            {ride?.dropoffLocation}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            <Clock size={14} className="mr-1 inline" />{" "}
                            {ride?.dropoff}
                          </p>
                        </div>
                      </div>
                      {ride.status !== "Completed" ? (
                        <div className="mt-4 flex justify-between text-gray-600 text-sm">
                          <p>
                            <strong>Estimated Distance:</strong>{" "}
                            {ride?.estimatedDistance} {ride?.distanceUnit}
                          </p>
                          <p>
                            <strong>Estimated Duration:</strong>{" "}
                            {ride?.estimatedTime}
                          </p>
                          <p>
                            <strong>Payment:</strong> {ride?.paymentMethod}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 flex justify-between text-gray-600 text-sm">
                          <p>
                            <strong>Distance:</strong> {ride?.totalDistance}{" "}
                            {ride?.distanceUnit}
                          </p>
                          <p>
                            <strong>Duration:</strong> {ride?.totalDuration}
                          </p>
                          <p>
                            <strong>Payment:</strong> {ride?.paymentMethod}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="mt-4 flex items-center space-x-4">
                        <div className="flex-1 text-center">
                          <p className="text-gray-500 text-sm">Pickup</p>
                          <div className="flex items-center justify-center text-blue-600 font-bold text-lg">
                            <MapPin className="mr-2" size={20} />
                            {ride?.pickup}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            <Clock size={14} className="mr-1 inline" />{" "}
                            {ride?.pickupTime}
                          </p>
                        </div>

                        <div className="flex-1 border-dashed border-t-2 border-gray-400"></div>

                        <div className="flex-1 text-center">
                          <p className="text-gray-500 text-sm">Drop-off</p>
                          <div className="flex items-center justify-center text-purple-600 font-bold text-lg">
                            <MapPin className="mr-2" size={20} />
                            {ride?.dropoff}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            <Clock size={14} className="mr-1 inline" />{" "}
                            {ride?.dropoffTime}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleExpand(ride?.id)}
                        className="block mx-auto mt-2 text-sm text-blue-600 font-medium"
                      >
                        {expandedRide === ride?.id ? "View Less" : "View More"}
                        {expandedRide === ride?.id ? (
                          <ChevronUp size={14} className="inline ml-1" />
                        ) : (
                          <ChevronDown size={14} className="inline ml-1" />
                        )}
                      </button>

                      {expandedRide === ride?.id && (
                        <div className="mt-3 text-gray-600 text-sm text-center space-y-1">
                          <p>
                            <strong>Distance:</strong> {ride?.distance}
                          </p>
                          <p>
                            <strong>Duration:</strong> {ride?.duration}
                          </p>
                          <p>
                            <strong>Payment:</strong> {ride?.paymentMethod}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-10">
                <div className="relative bg-white rounded-lg shadow-lg border border-gray-300 px-6 py-4 w-80 text-center">
                  {/* Decorative cutouts on left and right */}
                  <div className="absolute top-1/2 left-0 w-6 h-6 bg-gray-50 rounded-full transform -translate-y-1/2 -translate-x-1/2 border border-gray-300"></div>
                  <div className="absolute top-1/2 right-0 w-6 h-6 bg-gray-50 rounded-full transform -translate-y-1/2 translate-x-1/2 border border-gray-300"></div>

                  <p className="text-gray-600 text-lg font-semibold">
                    No Rides Found
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    You haven’t taken any rides yet.
                  </p>
                  <div className="border-dashed border-t-2 border-gray-300 mt-4 pt-2">
                    <p className="text-gray-400 text-xs">
                      Book a ride to see history here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
