import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [settings, setSettings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/profile/${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        switch (activeTab) {
          case "about":
            setAbout(response.data.bio);
            break;
          case "status":
            setStatus(response.data.status);
            break;
          case "wallet":
            setWalletBalance(response.data.balance);
            break;
          case "settings":
            setSettings(response.data.settings);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab} data:`, error);
        alert(`Failed to fetch ${activeTab} data. Please try again.`);
        navigate("/login"); // Redirect to login if unauthorized
      }
    };

    fetchData();
  }, [activeTab, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="bg-white w-64 p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Profile</h2>
        <nav className="space-y-2">
          <NavLink
            to="#"
            onClick={() => setActiveTab("about")}
            className={`block p-2 rounded-lg ${
              activeTab === "about"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            About
          </NavLink>
          <NavLink
            to="#"
            onClick={() => setActiveTab("status")}
            className={`block p-2 rounded-lg ${
              activeTab === "status"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Status
          </NavLink>
          <NavLink
            to="#"
            onClick={() => setActiveTab("wallet")}
            className={`block p-2 rounded-lg ${
              activeTab === "wallet"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Wallet
          </NavLink>
          <NavLink
            to="#"
            onClick={() => setActiveTab("settings")}
            className={`block p-2 rounded-lg ${
              activeTab === "settings"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold mb-6 capitalize">{activeTab}</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {activeTab === "about" && <p>{about}</p>}
          {activeTab === "status" && <p>Status: {status}</p>}
          {activeTab === "wallet" && <p>Wallet Balance: ${walletBalance}</p>}
          {activeTab === "settings" && (
            <pre>{JSON.stringify(settings, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
