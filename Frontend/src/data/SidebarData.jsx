// Sidebar menu items
import Icons from "./Icons";
export const sidebarMenu = [
    {
      title: "Dashboards",
      icon: Icons.Dashboard,
      link: "/dashboard",
    },
    {
      title: "LC",
      icon: Icons.LC,
      subMenu: [
        { title: "Add Request", link: "/lc-request",icon:Icons.Add }      ],
    },
    {
      title: "Notifications",
      icon: "bi-bell-fill",
      link: "/notifications",
    },
    {
      title: "Settings",
      icon: "bi-gear-fill",
      link: "/settings",
    },
  ];
  
  // Navbar menu items
  export const navbarMenu = [
    { title: "Profile", link: "/profile" },
    { title: "Help", link: "/help" },
  ];
  