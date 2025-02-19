import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookRide from "./page/BookRide";
import HomePage from "./page/HomePage";
import RideHistory from "./page/RideHistory";
import Contact from "./page/Contact";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./page/Profile";
import { ProfileProvider } from "./context/ProfileContext";

import { Provider } from "react-redux";
import store from "./reducers/store";
import { LoadScript } from "@react-google-maps/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/book-ride"
            element={
              <LoadScript
                googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"
                libraries={["places"]}
              >
                <BookRide />
              </LoadScript>
            }
          />
          <Route path="/ride-history" element={<RideHistory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Wrap Profile in ProfileProvider */}
          <Route
            path="/profile"
            element={
              <ProfileProvider>
                <Profile />
              </ProfileProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
