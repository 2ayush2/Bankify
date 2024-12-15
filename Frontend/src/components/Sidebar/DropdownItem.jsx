import { useState } from "react";
import { Link } from "react-router-dom";
import { CaretDown, CaretUp } from "phosphor-react";

const DropdownItem = ({ item, activeItem, setActiveItem, isCollapsed }) => {
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
        <div className="flex items-center">
          {/* Parent Icon */}
          <item.icon
            size={20}
            className={`mr-3 ${
              activeItem === item.title ? "text-green-600" : "text-gray-400"
            }`}
          />
          {!isCollapsed && item.title}
        </div>
        {!isCollapsed &&
          (isDropdownOpen ? (
            <CaretUp size={16} className="text-gray-400" />
          ) : (
            <CaretDown size={16} className="text-gray-400" />
          ))}
      </button>

      {/* Subcategories */}
      {isDropdownOpen && !isCollapsed && (
        <div className="space-y-4 pl-6 mt-2">
          {item.subCategories.map((category, index) => (
            <div key={index}>
              {/* Category Title */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {category.title}
              </h3>
              {/* Subcategory Items */}
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
                    <subItem.icon
                      size={16}
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
