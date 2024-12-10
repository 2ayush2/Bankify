import React, { useState } from "react";
import { Plus, Minus } from "phosphor-react";
import ReactTooltip from "react-tooltip";
import LightweightTable from "./DescriptionOfGoods"; // Import the LightweightTable component

const FormStep = ({ fields, stepData = {}, onFieldChange }) => {
  const [presentationPeriod, setPresentationPeriod] = useState(
    stepData["Presentation Period"] || 0
  );
  const [toggleValues, setToggleValues] = useState({}); // Manage multiple toggles

  // Initialize toggle values from stepData
  React.useEffect(() => {
    const initialToggles = {};
    fields.forEach((field) => {
      if (field.type === "toggle") {
        initialToggles[field.label] = stepData[field.label] || field.options[0];
      }
    });
    setToggleValues(initialToggles);
  }, [fields, stepData]);

  const handleInputChange = (e, label) => {
    const value = e.target.value;
    onFieldChange(label, value);
  };

  const handleToggleChange = (label, value) => {
    setToggleValues((prev) => ({
      ...prev,
      [label]: value,
    }));
    onFieldChange(label, value);
  };

  const handleCounterChange = (label, adjustment) => {
    const newValue = Math.max(0, presentationPeriod + adjustment);
    setPresentationPeriod(newValue);
    onFieldChange(label, newValue);
  };

  return (
    <form className="grid grid-cols-12 gap-x-6 gap-y-9" style={{ width: "100%" }}>
      {fields.map((field, index) => (
        <div key={index} className={field.gridColumn || "col-span-12"}>
          <label className="block text-sm font-body font-medium text-[#1A1A1A] mb-2 flex items-center">
            {field.label}
            {field.tooltip && (
              <span
                className="ml-2 bg-primarys text-white rounded-circle cursor-pointer h-4 w-4 flex items-center justify-center"
                data-tip={field.tooltip}
              >
                ?
              </span>
            )}
          </label>
          {field.tooltip && <ReactTooltip place="top" effect="solid" />}
          {field.type === "text" || field.type === "number" || field.type === "date" ? (
            <input
              type={field.type}
              placeholder={field.placeholder || ""}
              defaultValue={stepData[field.label] || ""}
              className="form-control py-[10px]"
              onChange={(e) => handleInputChange(e, field.label)}
            />
          ) : field.type === "select" ? (
            <select
              defaultValue={stepData[field.label] || ""}
              className="form-select py-[10px]"
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
            <div className="d-flex flex-wrap gap-x-7 gap-y-3 mt-3">
              {field.options.map((option, idx) => (
                <label key={idx} className="form-check form-check-inline">
                  <input
                    type="radio"
                    name={field.label}
                    value={option}
                    defaultChecked={stepData[field.label] === option}
                    className="form-check-input form-radio text-green-600 focus:ring-green-500"
                    onChange={(e) => handleInputChange(e, field.label)}
                  />
                  <span className="form-check-label">{option}</span>
                </label>
              ))}
            </div>
          ) : field.type === "toggle" ? (
            <div className="btn-group w-100">
              {field.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`py-[10px] btn ${
                    toggleValues[field.label] === option
                      ? "bg-primarys hover:bg-green-400 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleToggleChange(field.label, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : field.type === "counter" ? (
            <div className="input-group">
              <button
                type="button"
                className="btn bg-primarys hover:bg-green-500 py-[14px] rounded-l-2xl"
                onClick={() => handleCounterChange(field.label, -1)}
              >
                <Minus className="text-white" weight="bold" size={16} />
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={presentationPeriod}
                readOnly
              />
              <button
                type="button"
                className="btn bg-primarys hover:bg-green-500 rounded-r-2xl"
                onClick={() => handleCounterChange(field.label, 1)}
              >
                <Plus className=" text-white" weight="bold" size={16} />
              </button>
            </div>
          ) : field.type === "table" ? (
            <LightweightTable
              initialColumns={field.columns}
              initialRows={Array.from({ length: field.rows }, (_, id) => ({
                id: id + 1,
                data: Array(field.columns.length).fill(""),
              }))}
              onTableDataChange={(data) => onFieldChange(field.label, data)}
            />
          ) : null}
        </div>
      ))}
    </form>
  );
};

export default FormStep;
