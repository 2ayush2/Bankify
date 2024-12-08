
const FormControls = ({ currentStep, totalSteps, onNext, onBack }) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        disabled={currentStep === 0}
        onClick={onBack}
      >
        Back
      </button>
      <div className="flex space-x-4">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Save as Draft</button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          disabled={currentStep === totalSteps - 1}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormControls;
