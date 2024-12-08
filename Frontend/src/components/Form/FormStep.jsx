import React, { useState } from "react";
import { Plus, Minus } from "phosphor-react"; // Import Phosphor Icons

const FormStep = ({ fields, stepData = {}, onFieldChange }) => {
  const [presentationPeriod, setPresentationPeriod] = useState(
    stepData["Presentation Period"] || 0
  );
  const [toggleValue, setToggleValue] = useState(
    stepData["Charges"] || "Applicant’s Account"
  );

  const handleInputChange = (e, label) => {
    const value = e.target.value;
    onFieldChange(label, value);
  };

  const handleToggleChange = (label, value) => {
    setToggleValue(value);
    onFieldChange(label, value);
  };

  const handleCounterChange = (label, adjustment) => {
    const newValue = Math.max(0, presentationPeriod + adjustment);
    setPresentationPeriod(newValue);
    onFieldChange(label, newValue);
  };

  return (
    <form className="grid grid-cols-12 gap-6">
      {fields.map((field, index) => (
        <div
          key={index}
          className={`${
            field.gridColumn || "col-span-12 sm:col-span-6 lg:col-span-4"
          }`} // Dynamically assign column span with responsiveness
        >
          <label className="block text-sm font-body font-medium text-[#1A1A1A] mb-1">
            {field.label}
          </label>
          {field.type === "text" || field.type === "number" || field.type === "date" ? (
            <input
              type={field.type}
              placeholder={field.placeholder || ""}
              defaultValue={stepData[field.label] || ""}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500"
              onChange={(e) => handleInputChange(e, field.label)}
            />
          ) : field.type === "select" ? (
            <select
              defaultValue={stepData[field.label] || ""}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500"
              onChange={(e) => handleInputChange(e, field.label)}
            >
              <option value="">Select</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div className="flex flex-wrap gap-4">
              {field.options.map((option, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={field.label}
                    value={option}
                    defaultChecked={stepData[field.label] === option}
                    className="form-radio text-green-600"
                    onChange={(e) => handleInputChange(e, field.label)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : field.type === "toggle" ? (
            <div className="flex flex-wrap border rounded-md overflow-hidden">
              {field.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`px-4 py-2 flex-1 ${
                    toggleValue === option
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => handleToggleChange(field.label, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : field.type === "counter" ? (
            <div className="flex items-center rounded-md">
              <button
                type="button"
                className="px-4 py-[12px] bg-primarys text-white hover:bg-gray-300"
                onClick={() => handleCounterChange(field.label, -1)}
              >
                <Minus className="text-md text-white" weight="bold" />
              </button>
              <span className="px-4 ">{presentationPeriod}</span>
              <button
                type="button"
                className="px-4 py-[12px] bg-primarys text-white hover:bg-gray-300"
                onClick={() => handleCounterChange(field.label, 1)}
              >
                <Plus className="text-md text-white-700" weight="bold" />
              </button>
            </div>
          ) : null}
        </div>
      ))}
    </form>
  );
};

export default FormStep;
