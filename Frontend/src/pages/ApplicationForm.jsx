import React, { useState } from "react";
import { lcFormSteps } from "../data/formConfig";
import ProgressBar from "../components/Sidebar/ProgressBar";
import StickyHeader from "../components/Form/StickyHeader";
import TopProgressBar from "../components/Form/TopProgressBar";
import FormHeader from "../components/Form/FormHeader";
import FormStep from "../components/Form/FormStep";
import ReactTooltip from "react-tooltip";
import { numberToWords } from "../utils/NumberToWords"; // Utility function for conversion
import axios from "axios";

const LCAddRequest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(
    lcFormSteps.map((step) => {
      return step.fields.reduce((acc, field) => {
        acc[field.label] = field.type === "table" ? { columns: field.columns, rows: [] } : "";
        if (field.hasTextArea) acc[`${field.label} Text`] = ""; // Initialize text area
        return acc;
      }, {});
    })
  );
  console.log(formData);

  const [stepCompletion, setStepCompletion] = useState(
    lcFormSteps.map(() => false) // Initialize all steps as incomplete
  );

  const [numberInWords, setNumberInWords] = useState(""); // For live conversion

  const handleFieldChange = (stepIndex, fieldLabel, value) => {
    setFormData((prev) => {
      const updated = [...prev];
      updated[stepIndex][fieldLabel] = value;

      // Trigger live conversion for specific fields
      if (fieldLabel === "Amount in Numbers") {
        const numValue = parseInt(value.replace(/,/g, ""), 10) || 0;
        setNumberInWords(numberToWords(numValue));
      }

      // Check if the step is complete
      const isStepComplete = lcFormSteps[stepIndex].fields.every((field) => {
        if (field.type === "table") {
          const tableData = updated[stepIndex][field.label];
          return tableData.rows.length > 0;
        }
        return updated[stepIndex][field.label]; // Other fields
      });

      setStepCompletion((prevCompletion) => {
        const updatedCompletion = [...prevCompletion];
        updatedCompletion[stepIndex] = isStepComplete;
        return updatedCompletion;
      });

      return updated;
    });
  };

  const handleNext = () => {
    if (currentStep < lcFormSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Flatten all step data into a single object
      const mergedData = formData.reduce((acc, stepData) => ({ ...acc, ...stepData }), {});

      const response = await axios.post("http://localhost:5000/api/submit-form", mergedData);
    console.log("Form submitted successfully:", response.data);

      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepCompletion[stepIndex] || stepIndex === currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const currentStepConfig = lcFormSteps[currentStep];
  const currentFields = currentStepConfig?.fields || [];
  const subSections = currentStepConfig?.subSections || [];
  const totalFields =
    currentFields.length +
    subSections.reduce((acc, sub) => acc + sub.fields.length, 0);
  const completedFields = [
    ...currentFields,
    ...subSections.flatMap((sub) => sub.fields),
  ].filter((field) => {
    if (field.type === "table") {
      const tableData = formData[currentStep][field.label];
      return tableData.rows.length > 0; // Count tables as completed if they have rows
    }
    return formData[currentStep][field.label];
  }).length;

  const firstStepData = formData[0];

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[24%] bg-gray-50 md:h-full">
        <ProgressBar
          steps={lcFormSteps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          stepCompletion={stepCompletion}
        />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-full p-4 relative">
        <div
          className="bg-background w-[90%] mt-24 py-10 rounded-xl px-5 mx-auto shadow-[0px 2px 2px 1px rgba(114, 110, 110, 0.04)]"
          style={{ height: "fit-content", overflow: "auto" }}
        >
          {/* Sticky Header */}
          {currentStep > 0 && <StickyHeader firstStepData={firstStepData} />}

          {/* Top Progress Bar */}
          <TopProgressBar completed={completedFields} total={totalFields} />

          {/* Header */}
          <FormHeader
            title={currentStepConfig.title}
            description={currentStepConfig.description}
          />

          {/* Dynamic Heading and Subheading */}
          {currentStepConfig.heading && (
            <div
              className={`${
                currentStepConfig.headingPosition === "center"
                  ? "text-center mb-4"
                  : "text-left mb-4"
              }`}
            >
              <h2 className="text-md font-semibold text-black inline-flex items-center justify-center">
                {currentStepConfig.heading}
                {currentStepConfig.tooltip && (
                  <span
                    className="ml-2 bg-green-600 text-white rounded-full flex items-center justify-center text-xs w-5 h-5 cursor-pointer"
                    data-tip={currentStepConfig.tooltip}
                  >
                    ?
                  </span>
                )}
              </h2>
              {currentStepConfig.subHeading && (
                <p className="text-sm text-gray-600 mt-2">
                  {currentStepConfig.subHeading}
                  {currentStepConfig.subHeadingTooltip && (
                    <span
                      className="ml-2 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs w-5 h-5 cursor-pointer"
                      data-tip={currentStepConfig.subHeadingTooltip}
                    >
                      ?
                    </span>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Fields */}
          <FormStep
            fields={currentFields}
            stepData={formData[currentStep]}
            onFieldChange={(fieldLabel, value) =>
              handleFieldChange(currentStep, fieldLabel, value)
            }
          />

          {/* Conditionally Render Amount in Words */}
          {formData[currentStep]["Amount in Numbers"] && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Amount in Words
              </label>
              <div className="p-3 bg-gray-200 rounded-md text-gray-800">
                {numberInWords || "—"}
              </div>
            </div>
          )}

          {/* Subsections */}
          {subSections.map((section, index) => (
            <div key={index} className="mt-8">
              {section.heading && (
                <div
                  className={`${
                    section.headingPosition === "center"
                      ? "text-center mb-4"
                      : "text-left mb-4"
                  }`}
                >
                  <h2 className="text-md font-semibold text-black inline-flex items-center justify-center">
                    {section.heading}
                    {section.tooltip && (
                      <span
                        className="ml-2 bg-green-600 text-white rounded-full flex items-center justify-center text-xs w-5 h-5 cursor-pointer"
                        data-tip={section.tooltip}
                      >
                        ?
                      </span>
                    )}
                  </h2>
                </div>
              )}
              <FormStep
                fields={section.fields}
                stepData={formData[currentStep]}
                onFieldChange={(fieldLabel, value) =>
                  handleFieldChange(currentStep, fieldLabel, value)
                }
              />
            </div>
          ))}

          {/* Navigation */}
          <div className="flex justify-between mt-9">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-600"
              disabled={currentStep === 0}
              onClick={handleBack}
            >
              Back
            </button>
            {currentStep === lcFormSteps.length - 1 ? (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                disabled={completedFields < totalFields}
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LCAddRequest;
