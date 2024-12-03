import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { sidebarMenu, navbarMenu } from "./data/SidebarData";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const App = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    // Handle logout logic, e.g., clearing auth tokens.
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar menuItems={sidebarMenu} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        <Navbar navItems={navbarMenu} onLogout={handleLogout} />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
