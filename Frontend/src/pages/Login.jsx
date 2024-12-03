import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic (e.g., API call)
    navigate("/"); // Redirect to the dashboard
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
