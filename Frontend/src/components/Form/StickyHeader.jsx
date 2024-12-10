import React from "react";
import { MapPin, Calendar } from "phosphor-react"; // Importing Phosphor Icons

const StickyHeader = ({ firstStepData }) => {
  return (
    <div className="bg-[#EFFFF67A] py-9 absolute left-0 p-4 rounded-md pb-32 w-full top-0 z-50">
      <div className="flex justify-between items-center px-[64px] ">
        {/* Branch Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MapPin className="text-green-500" size={20} weight="bold" /> {/* Branch Icon */}
            <span className="font-semibold text-gray-700">Branch:</span>
            <span className="ml-2 text-gray-900">{firstStepData["Branch Name"] || "N/A"}</span>
          </div>
        </div>

        {/* Date Section */}
        <div className="flex items-center space-x-2">
          <Calendar className="text-green-500" size={20} weight="bold" /> {/* Date Icon */}
          <span className="font-semibold text-gray-700">Date:</span>
          <span className="ml-2 text-gray-900">{firstStepData["Date"] || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
