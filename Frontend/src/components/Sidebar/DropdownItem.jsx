import { useState } from "react";
import { Link } from "react-router-dom";
import { CaretDown, CaretUp } from "phosphor-react";

const DropdownItem = ({ item, activeItem, setActiveItem }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      {/* Parent Dropdown Toggle */}
      <button
        className={`flex items-center justify-between w-full p-3 rounded-lg text-sm font-semibold ${
          activeItem === item.title
            ? "text-green-600 bg-green-100"
            : "text-gray-600 hover:bg-green-100"
        }`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {/* Parent Icon and Title */}
        <div className="flex items-center">
          <item.icon
            size={20}
            weight="duotone"
            className={`mr-3 ${
              activeItem === item.title ? "text-green-600" : "text-gray-400"
            }`}
          />
          {item.title}
        </div>

        {/* Dropdown Arrow */}
        {isDropdownOpen ? (
          <CaretUp size={16} className="text-gray-400" />
        ) : (
          <CaretDown size={16} className="text-gray-400" />
        )}
      </button>

      {/* Dropdown Submenu */}
      {isDropdownOpen && (
        <div className="space-y-4 pl-6 mt-2">
          {item.subCategories?.map((category, index) => (
            <div key={index}>
              {/* Category Header */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {category.title}
              </h3>

              {/* Category Items */}
              <div className="space-y-2">
                {category.items.map((subItem) => (
                  <Link
                    key={subItem.title}
                    to={subItem.link}
                    onClick={() => setActiveItem(subItem.title)}
                    className={`flex items-center p-2 rounded-lg text-sm font-medium ${
                      activeItem === subItem.title
                        ? "text-green-600 bg-green-100"
                        : "text-gray-600 hover:bg-green-100"
                    }`}
                  >
                    {/* Submenu Icon */}
                    <subItem.icon
                      size={16}
                      weight="duotone"
                      className={`mr-3 ${
                        activeItem === subItem.title
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    />
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
