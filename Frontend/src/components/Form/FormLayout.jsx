import React, { useState } from "react";
import FormHeader from "./FormHeader";
import FormStep from "./FormStep";
import FormControls from "./FormControls";

const FormLayout = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onBack,
}) => {
  const [completedFields, setCompletedFields] = useState(0);

  const handleFieldComplete = () => {
    setCompletedFields((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50  shadow-md">
        <h3 className="text-lg font-semibold mb-4">Application Progress</h3>
        <ul>
          {totalSteps.map((s, index) => (
            <li key={index}>
              {/* Logic as above */}
            </li>
          ))}
        </ul>
      </div>

      {/* Form Content */}
      <div className="flex-grow bg-green-50 p-8">
        {/* Title and Description */}
        <FormHeader title={step.title} description={step.description} />

        {/* Fields */}
        <FormStep fields={step.fields} onCompleteField={handleFieldComplete} />

        {/* Completion Counter */}
        <div className="absolute top-4 right-4">
          {completedFields}/{step.fields.length} fields completed
        </div>

        {/* Controls */}
        <FormControls currentStep={currentStep} onNext={onNext} onBack={onBack} />
      </div>
    </div>
  );
};

export default FormLayout;
