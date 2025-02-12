import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

// Routes Array with Levels
const navRoutes = [
  { level: 1, route: "/", name: "Home" },
  { level: 2, route: "/ride-history", name: "Ride History" },
  { level: 3, route: "/contact", name: "Contact" }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close menu when clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">RideApp</div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-800 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
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
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 py-6">
            {navRoutes.map(({ level, route, name }) => (
              <NavLink
                key={level}
                to={route}
                className="block py-2 px-4 rounded-lg text-gray-700 hover:text-blue-500 transition"
                onClick={closeMenu} // Close menu on link click
              >
                {name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
