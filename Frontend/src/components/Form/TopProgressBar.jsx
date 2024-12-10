import React from "react";

const TopProgressBar = ({ completed, total }) => {
  const progress = (completed / total) * 100;

  return (
    <div className="relative">
      {/* Horizontal Progress Bar */}
      <div className="w-full h-2 bg-gray-300 rounded-md mb-12">
        <div
          className="h-full bg-green-600 rounded-md mb-4"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Completed/Total Counter */}
<div className="absolute right-0 top-[-28px] text-sm text-black-500 font-body">
  <span className="font-bold">{completed}</span> of <span className="font-bold">{total}</span> fields completed
</div>

    </div>
  );
};

export default TopProgressBar;
