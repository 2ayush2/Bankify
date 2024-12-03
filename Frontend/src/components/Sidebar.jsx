import React, { useState } from "react";
import logo from '../assets/images/logo.png'


const Sidebar = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-green-600 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list text-xl"></i>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white-600 shadow-[0px_16px_44px_0px_rgba(0,0,0,0.07)] -600 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="  justify-between items-center  border-green-700">
<div className="logo flex py-4 justify-center">
  i <img
    src={logo}
    alt="Logo"
    className=" rounded-responsive object-cover"
  />
  </div>          <button
            className="md:hidden text-white text-2xl"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4 space-y-4">
          {menuItems.map((item) =>
            item.subMenu ? (
              <DropdownItem key={item.title} item={item} />
            ) : (
              <a
                key={item.title}
                href={item.link}
                className="block p-2 text-[14px] text-primary font-sidebar font-medium rounded hover:bg-green-700 flex items-center"
              >
               {typeof item.icon === 'string' ? (
              <i className={`${item.icon} text-[#768888] mr-2`} /> // Library icon (Font Awesome, Bootstrap Icons)
            ) : (
              <span className="mr-2">{item.icon}</span> // Custom SVG
            )}
            <span className="text-primarys" >{item.title}</span>
              </a>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

// Dropdown Submenu Component
const DropdownItem = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <button
        className="text-primarys w-full flex items-center p-2 rounded hover:bg-green-700"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <i className={`bi ${item.icon} mr-3 text-[#768888]`}></i> {item.title}
        <i
          className={`bi ml-auto  ${
            isDropdownOpen ? "fa-solid fa-chevron-up" : "fa-solid fa-circle-chevron-down"
          }`}
        ></i>
      </button>
      {isDropdownOpen && (
        <div className="pl-6 space-y-1">
          {item.subMenu.map((subItem) => (
            <a
              key={subItem.title}
              href={subItem.link}
              className="block p-2 text-[#768888] rounded hover:bg-green-700"
            >
             {typeof subItem.icon === 'string' ? (
              <i className={`${subItem.icon} mr-2`} /> // Library icon (Font Awesome, Bootstrap Icons)
            ) : (
              <span className="mr-2">{subItem.icon}</span> // Custom SVG
            )}
           <span className="" >{subItem.title}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
