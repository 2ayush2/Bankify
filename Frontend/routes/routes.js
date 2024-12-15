import Dashboard from "../src/pages/Dashboard";
import Settings from "../src/pages/Setting";
import ApplicationForm from "../src/pages/ApplicationForm";

// Centralized route definitions
export const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    title: "Dashboard",
    hideSidebarAndNavbar: true, // Sidebar and Navbar should be shown
  },
  {
    path: "/settings",
    component: Settings,
    title: "Settings",
    hideSidebarAndNavbar: false, // Sidebar and Navbar should be shown
  },
  {
    path: "/addrequest",
    component: ApplicationForm,
    title: "Add Request",
    hideSidebar: false, // Sidebar is shown
    collapsibleSidebar: true, // Sidebar is collapsible
    hideNavbar: true, // Navbar is shown
    collapsibleNavbar: true, // Navbar is collapsible
  }
  /** */
  /**
  {
    path: "/test",
    component: TestPage,
    title: "Test Page",
    hideSidebarAndNavbar: true, // Fullscreen, no Sidebar or Navbar
  },
  {
    path: "/login",
    component: LoginPage,
    title: "Login Page",
    hideSidebarAndNavbar: true, // Fullscreen, no Sidebar or Navbar
  },
  {
    path: "*", // Catch-all route for 404
    component: PageNotFound,
    title: "404 Not Found",
    hideSidebarAndNavbar: true, // Fullscreen layout for errors
  },
  */
];