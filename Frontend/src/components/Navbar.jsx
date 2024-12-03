import React, { useState } from "react";
import logo from '../assets/images/logo.png'

const Navbar = ({ navItems, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white shadow-md px-4 py-3">
      {/* Logo */}
<div></div>
      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-bold">Hari Kc</span>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-48">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {item.title}
                </a>
              ))}
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
