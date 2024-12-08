import React, { useState, useEffect } from "react";
import { Bell, CaretDown, UserCircle,CaretCircleDown } from "phosphor-react"; // Phosphor Icons
import { Link, useNavigate } from "react-router-dom"; // For navigation

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [profile, setProfile] = useState({ name: "", avatar: "" });
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    // Simulated dynamic data fetching
    setNotifications(6); // Replace with an API call

    // Languages array
    setLanguages([
      { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
      { code: "fr", label: "French", flag: "https://flagcdn.com/w40/fr.png" },
      { code: "de", label: "German", flag: "https://flagcdn.com/w40/de.png" },
    ]);
    setSelectedLanguage({ code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" });

    // Profile data
    setProfile({
      name: "Hari Kc",
      avatar: "https://i.pravatar.cc/40", // Replace with an actual API call
    });
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLanguageDropdownOpen(false);
    console.log(`Language changed to: ${language.label}`);
  };

  const handleProfileOptionClick = (route) => {
    setProfileDropdownOpen(false); // Close the dropdown
    navigate(route); // Navigate to the route
  };

  return (
    <div className="flex items-center justify-between p-8 bg-white shadow-md">
      {/* Left Section: Logo */}
      <div className="flex items-center">
       
       
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <Bell className="text-blue-500" size={24} weight="duotone" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          >
            <img
              src={selectedLanguage.flag}
              alt={selectedLanguage.label}
              className="h-5 w-5"
            />
            <span className="text-gray-700 font-medium font-body">{selectedLanguage.label}</span>
            <CaretCircleDown className="text-gray-500" size={24} weight="thin" />
          </div>
          {languageDropdownOpen && (
            <div className="absolute mt-2 bg-white shadow-md rounded-lg w-40 z-50">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageChange(lang)}
                >
                  <img src={lang.flag} alt={lang.label} className="h-6 w-6" />
                  <span className="font-medium" >{lang.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <UserCircle className="h-8 w-8 text-gray-500" />
            )}
            <span className="text-gray-700 text-sm font-medium font-body">{profile.name || "User"}</span>
            <CaretCircleDown className="text-gray-500" size={22} weight="thin" />
          </div>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-40 z-50">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProfileOptionClick("/profile")}
              >
                <span>My Profile</span>
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProfileOptionClick("/settings")}
              >
                <span>Settings</span>
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProfileOptionClick("/logout")}
              >
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;