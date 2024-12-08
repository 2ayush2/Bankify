import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { sidebarMenu } from "./utils/constants";
import AppRouter from "../routes/AppRouter";
import { routes } from "../routes/routes";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  // Find the current route's configuration
  const currentRoute = routes.find((route) => route.path === location.pathname);

  // Determine if Sidebar and Navbar should be hidden
  const hideSidebarAndNavbar = currentRoute?.hideSidebarAndNavbar ?? false;

  return (
    <div className={`flex ${hideSidebarAndNavbar ? "bg-gray-50" : ""}`}>
      {/* Sidebar (only render if not hidden) */}
      {!hideSidebarAndNavbar && <Sidebar menuItems={sidebarMenu} />}
      
      <div className="flex-grow flex flex-col">
        {/* Navbar (only render if not hidden) */}
        {!hideSidebarAndNavbar && <Navbar />}
        
        {/* Main Content */}
        <div className="">
          <AppRouter />
        </div>
      </div>
    </div>
  );
};

export default App;
