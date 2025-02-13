import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const navRoutes = [
  { level: 1, route: "/", name: "Home" },
  { level: 2, route: "/ride-history", name: "Ride History" },
  { level: 3, route: "/contact", name: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsProfileOpen(false);
    navigate("/login");
  };

  const handleLogin = () => {
    setIsProfileOpen(false);
    navigate("/login");
  };

  const handleViewProfile = () => {
    setIsProfileOpen(false); // Close profile dropdown
    navigate("/profile"); // Redirect to profile page
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-800">RideApp</div>

          <button
            className="md:hidden p-2 text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="hidden md:flex space-x-6 items-center">
            {navRoutes.map(({ level, route, name }) => (
              <NavLink
                key={level}
                to={route}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg text-gray-700 hover:text-blue-500 transition ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            <div className="relative">
              <button
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User size={24} className="text-gray-700" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={handleViewProfile}
                        className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 py-6">
            {navRoutes.map(({ level, route, name }) => (
              <NavLink
                key={level}
                to={route}
                className="block py-2 px-4 rounded-lg text-gray-700 hover:text-blue-500 transition"
                onClick={closeMenu}
              >
                {name}
              </NavLink>
            ))}

            <button
              className="block py-2 px-4 rounded-lg text-gray-700 hover:text-blue-500 transition"
              onClick={isLoggedIn ? handleLogout : handleLogin}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
