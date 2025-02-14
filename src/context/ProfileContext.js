// ProfileContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const ProfileContext = createContext();

// Create a custom hook to use the ProfileContext
export const useProfile = () => {
  return useContext(ProfileContext);
};

// Create the provider component
export const ProfileProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [settings, setSettings] = useState({});

  // Value to be provided to all consuming components
  const value = {
    activeTab,
    setActiveTab,
    about,
    setAbout,
    status,
    setStatus,
    walletBalance,
    setWalletBalance,
    settings,
    setSettings,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};