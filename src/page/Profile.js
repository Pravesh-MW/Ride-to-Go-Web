import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaUserCircle, FaBell, FaCog, FaWallet } from "react-icons/fa"; // Import icons
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTab, setAbout, setStatus, setWalletBalance, setSettings } from "../reducers/profileSlice";
import Wallet from "../components/profile/Wallet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/profile/ProfileInfo";
import Settings from "../components/profile/Settings";
import ProfileInfo from "../components/profile/ProfileInfo";
import Notifications from "../components/profile/Notifications";

const Profile = () => {
  const dispatch = useDispatch();
  const { activeTab, about, status, walletBalance, settings } = useSelector(
    (state) => state.profile
  );

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex flex-grow">
          {/* Sidebar */}
          <div className="bg-white w-64 p-4 shadow-lg">
            {/* User Info Section */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUserCircle className="text-gray-600 text-2xl" /> {/* User avatar icon */}
              </div>
              <div>
                <p className="font-semibold text-gray-800">User Name</p>
                <p className="text-gray-500 text-sm">user@example.com</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <NavLink
                to="#"
                onClick={() => dispatch(setActiveTab("about"))}
                className={`flex items-center p-2 rounded-lg ${
                  activeTab === "about"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaUser className="mr-2" /> {/* Icon */}
                My Profile
              </NavLink>
              <NavLink
                to="#"
                onClick={() => dispatch(setActiveTab("wallet"))}
                className={`flex items-center p-2 rounded-lg ${
                  activeTab === "wallet"
                  ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <FaWallet className="mr-2" /> {/* Icon */}
                Wallet
              </NavLink>
              <NavLink
                to="#"
                onClick={() => dispatch(setActiveTab("notifications"))}
                className={`flex items-center p-2 rounded-lg ${
                  activeTab === "notifications"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaBell className="mr-2" /> {/* Icon */}
                Notifications
              </NavLink>
              <NavLink
                to="#"
                onClick={() => dispatch(setActiveTab("settings"))}
                className={`flex items-center p-2 rounded-lg ${
                  activeTab === "settings"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaCog className="mr-2" /> {/* Icon */}
                Settings
              </NavLink>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-8">
              {activeTab === "about" && <ProfileInfo/>}
              {activeTab === "wallet" && <Wallet />}
              {activeTab === "notifications" && <Notifications />}
              {activeTab === "settings" && <Settings settings={settings} setSettings={setSettings} />}
          </div>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
};

export default Profile;

