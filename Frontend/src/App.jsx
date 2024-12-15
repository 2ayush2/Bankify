import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "../routes/AppRouter";
import { routes } from "../routes/routes";
import { useLocation } from "react-router-dom";
import { sidebarMenu } from "./utils/constants";

const App = () => {
  const location = useLocation();

  // Find the current route's configuration
  const currentRoute = routes.find((route) => route.path === location.pathname);

  // Determine visibility and collapsible state for Sidebar and Navbar
  const hideSidebar = currentRoute?.hideSidebar ?? false;
  const collapsibleSidebar = currentRoute?.collapsibleSidebar ?? true;

  const hideNavbar = currentRoute?.hideNavbar ?? false;

  return (
    <div className="flex h-screen">
      {/* Sidebar (conditionally rendered) */}
      {!hideSidebar && (
        <Sidebar menuItems={sidebarMenu} collapsible={collapsibleSidebar} />
      )}

      <div className="flex-grow flex flex-col">
        {/* Navbar (conditionally rendered) */}
        {!hideNavbar && <Navbar />}

        {/* Main Content */}
        <main className=" overflow-auto">
          <AppRouter />
        </main>
      </div>
    </div>
  );
};

export default App;
