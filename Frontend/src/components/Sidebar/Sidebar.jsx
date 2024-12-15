import { useState } from "react";
import { Link } from "react-router-dom";
import { List } from "phosphor-react"; // Hamburger icon
import logo from "../../assets/images/logo.png";
import DropdownItem from "./DropdownItem"; // For handling submenus

const Sidebar = ({ menuItems, collapsible }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsible); // Sidebar state
  const [activeItem, setActiveItem] = useState(""); // Track active menu item

  const toggleSidebar = () => {
    if (collapsible) setIsCollapsed(!isCollapsed); // Collapse/Expand toggle
  };

  return (
    <div
      className={`h-screen bg-white shadow-md flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-3 py-3">
        {/* Logo */}
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </div>
        )}
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="p-2 focus:outline-none hover:bg-gray-100 rounded-md"
        >
          <List size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className={`px-2 ${isCollapsed ? "space-y-1" : "space-y-2"}`}>
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr
              key={`divider-${index}`}
              className="border-t border-gray-200 my-4"
            />
          ) : item.subCategories ? (
            <DropdownItem
              key={item.title}
              item={item}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              isCollapsed={isCollapsed}
            />
          ) : (
            <Link
              key={item.title}
              to={item.link}
              onClick={() => setActiveItem(item.title)}
              className={`flex items-center p-3 rounded-lg text-sm font-medium ${
                activeItem === item.title
                  ? "text-green-600 bg-green-100"
                  : "text-gray-600 hover:bg-green-100"
              }`}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-8 h-8">
                <item.icon
                  size={20}
                  className={`${
                    activeItem === item.title
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
