const PreviewData = ({ formData }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Preview Your Data</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded">{JSON.stringify(formData, null, 2)}</pre>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md mt-4">
          Submit
        </button>
      </div>
    );
  };
  
  export default PreviewData;
  