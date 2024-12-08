import React from "react";
import logo from "../../assets/images/logo.png";

const ProgressBar = ({ steps, currentStep, onStepClick, stepCompletion }) => {
  return (
    <div className="bg-[#F2F2F2] p-4 md:h-full ">
      {/* Mobile: Horizontal Progress Bar */}
      <div className="block md:hidden">
        <div className="relative flex overflow-x-auto whitespace-nowrap items-center pb-4">
          {/* Background Line */}
          <div className="absolute top-[50%] left-0 w-full h-[2px] bg-gray-300 z-0"></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative z-10 flex flex-col items-center ${
                stepCompletion[index] || index === currentStep
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={() => {
                if (stepCompletion[index] || index === currentStep) {
                  onStepClick(index);
                }
              }}
            >
              {/* Step Indicator */}
              <div
                className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
                  stepCompletion[index]
                    ? "bg-green-600 border-green-600 text-white"
                    : index === currentStep
                    ? "bg-white border-green-600"
                    : "bg-white border-gray-300"
                }`}
              >
                {stepCompletion[index] ? (
                  <i className="bi bi-check text-xs"></i>
                ) : index === currentStep ? (
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                ) : null}
              </div>

              {/* Step Title */}
              <div className="mt-2 text-center">
                <span
                  className={`text-xs ${
                    stepCompletion[index] || index === currentStep
                      ? "text-black font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-[50%] left-full h-[2px] w-8 ${
                    stepCompletion[index] ? "bg-green-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical Progress Bar */}
      <div className="hidden md:block">
        <div className="logo">
          <img className="w-30 h-[50px] mx-auto mb-4" src={logo} alt="" />
        </div>
        <div className="title pb-4">
        <h3 className="text-lg font-bold font-heading pb-2" >{steps[currentStep].title}</h3>

        <p className="text-sm text-gray-600 font-body" >{steps[currentStep].description} </p>
        </div>
     
        <ul className="relative space-y-6">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`relative flex items-start ${
                stepCompletion[index] || index === currentStep
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={() => {
                if (stepCompletion[index] || index === currentStep) {
                  onStepClick(index);
                }
              }}
            >
              {/* Vertical Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-[10px] top-6 h-full w-[3px] ${
                    stepCompletion[index] || index < currentStep
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}

              {/* Step Indicator */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  stepCompletion[index]
                    ? "bg-green-600 border-green-600 text-white"
                    : index === currentStep
                    ? "bg-white border-green-600"
                    : "bg-white border-gray-300"
                }`}
              >
                {stepCompletion[index] ? (
                  <i className="bi bi-check text-xs"></i>
                ) : index === currentStep ? (
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                ) : null}
              </div>

              {/* Step Title */}
              <div className="ml-2">
                <span
                  className={`text-md font-sidebar font-medium ${
                    stepCompletion[index] || index === currentStep
                      ? "text-black font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressBar;
