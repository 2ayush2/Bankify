import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import DropdownItem from "./DropdownItem";
import { Link } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  const [activeItem, setActiveItem] = useState(""); // Track active menu item

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col">
      {/* Sidebar Header */}
      <SidebarHeader />
``
      {/* Sidebar Menu */}
      <nav className="px-4 space-y-2">
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr
              key={`divider-${index}`}
              className="border-t border-gray-200 my-4"
            />
          ) : item.subMenu || item.subCategories ? (
            <DropdownItem
              key={item.title}
              item={item}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
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
              <item.icon
                size={20}
                weight="duotone"
                className={`mr-3 ${
                  activeItem === item.title ? "text-green-600" : "text-gray-400"
                }`}
              />
              {item.title}
            </Link>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
