import React, { useState } from "react";
import { lcFormSteps } from "../data/formConfig";
import ProgressBar from "../components/Sidebar/ProgressBar";
import StickyHeader from "../components/Form/StickyHeader"; // Import StickyHeader
import TopProgressBar from "../components/Form/TopProgressBar";
import FormHeader from "../components/Form/FormHeader";
import FormStep from "../components/Form/FormStep";

const LCAddRequest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(
    lcFormSteps.map((step) => {
      return step.fields.reduce((acc, field) => {
        acc[field.label] = ""; // Initialize all fields as empty strings
        return acc;
      }, {});
    })
  );

  const [stepCompletion, setStepCompletion] = useState(
    lcFormSteps.map(() => false) // Initialize all steps as incomplete
  );

  const handleFieldChange = (stepIndex, fieldLabel, value) => {
    setFormData((prev) => {
      const updated = [...prev];
      updated[stepIndex][fieldLabel] = value;

      // Check if the step is now complete
      const isStepComplete = lcFormSteps[stepIndex].fields.every(
        (field) => updated[stepIndex][field.label]
      );
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

  const handleStepClick = (stepIndex) => {
    if (stepCompletion[stepIndex] || stepIndex === currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const currentFields = lcFormSteps[currentStep]?.fields || [];
  const totalFields = currentFields.length;
  const completedFields = Object.values(formData[currentStep]).filter((value) => value).length;

  // Extract data from the first step to display in StickyHeader
  const firstStepData = formData[0];

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Sidebar - Progress Bar */}
      <div className="w-full md:w-[24%] bg-gray-50    md:h-full">
        <ProgressBar
          steps={lcFormSteps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          stepCompletion={stepCompletion}
        />
      </div>

      {/* Right Content - Main Form */}
      <div className="w-full md:w-full p-4  relative">
       <div className="bg-background w-[80%] mt-24 py-20 rounded-xl px-5 mx-auto shadow-[0px 2px 2px 1px rgba(114, 110, 110, 0.04)]" >
         {/* Conditionally Render Sticky Header */}
         {currentStep > 0 && <StickyHeader firstStepData={firstStepData} />}

{/* Top Progress Bar */}
<TopProgressBar completed={completedFields} total={totalFields} />

{/* Header */}
<FormHeader
  title={lcFormSteps[currentStep].title}
  description={lcFormSteps[currentStep].description}
/>

{/* Dynamic Fields */}
<FormStep
  fields={currentFields}
  stepData={formData[currentStep]}
  onFieldChange={(fieldLabel, value) =>
    handleFieldChange(currentStep, fieldLabel, value)
  }
/>

{/* Navigation Buttons */}
<div className="flex justify-between mt-6">
  <button
    className="px-4 py-2 bg-gray-300 rounded-md text-gray-600"
    disabled={currentStep === 0}
    onClick={handleBack}
  >
    Back
  </button>
  <button
    className="px-4 py-2 bg-green-600 rounded-md text-white"
    disabled={completedFields < totalFields}
    onClick={handleNext}
  >
    Next
  </button>
</div>
</div>
       </div>
       
    </div>
  );
};

export default LCAddRequest;
