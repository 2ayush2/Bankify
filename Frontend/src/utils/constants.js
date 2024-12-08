import { FileText, Clock,Bank, Gear, XCircle, CaretCircleDoubleDown, CheckCircle, SquaresFour } from "phosphor-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: SquaresFour,
    link: "/notifications",
  },
  
  {
    title: "LC",
    icon: Bank, // Main icon for LC
    subCategories: [
      {
        title: "General", // General items (like "New Request", "Dashboard")
        items: [
          { title: "New Request", link: "/addrequest", icon: FileText },
          { title: "Dashboard", link: "/lc/dashboard", icon: SquaresFour },
        ],
      },
      {
        title: "Status", // Status items
        items: [
          { title: "Pending", link: "/lc/pending", icon: Clock },
          { title: "Save Progress", link: "/lc/save-progress", icon: Gear },
          { title: "Rejected", link: "/lc/rejected", icon: XCircle },
          { title: "Processing", link: "/lc/processing", icon: CaretCircleDoubleDown },
          { title: "Approved", link: "/lc/approved", icon: CheckCircle },
        ],
      },
    ],
  },
  {
    title: "BG",
    icon: FileText, // Main icon for BG
    subCategories: [
      {
        title: "General",
        items: [
          { title: "New Request", link: "/bg/new-request", icon: FileText },
          { title: "Dashboard", link: "/bg/dashboard", icon: SquaresFour },
        ],
      },
      {
        title: "Status",
        items: [
          { title: "Pending", link: "/bg/pending", icon: Clock },
          { title: "Save Progress", link: "/bg/save-progress", icon: Gear },
          { title: "Rejected", link: "/bg/rejected", icon: XCircle },
          { title: "Processing", link: "/bg/processing", icon: CaretCircleDoubleDown },
          { title: "Approved", link: "/bg/approved", icon: CheckCircle },
        ],
      },
    ],
  },
  {
    title: "LC Amended",
    icon: FileText, // Main icon for LC Amended
    subCategories: [
      {
        title: "General",
        items: [
          { title: "Request Amend", link: "/lc-amended/request", icon: FileText },
          { title: "View Amend", link: "/lc-amended/view", icon: SquaresFour },
        ],
      },
      {
        title: "Status",
        items: [
          { title: "Pending", link: "/lc-amended/pending", icon: Clock },
          { title: "Save Progress", link: "/lc-amended/save-progress", icon: Gear },
          { title: "Rejected", link: "/lc-amended/rejected", icon: XCircle },
          { title: "Processing", link: "/lc-amended/processing", icon: CaretCircleDoubleDown },
          { title: "Approved", link: "/lc-amended/approved", icon: CheckCircle },
        ],
      },
    ],
  },
  { divider: true }, // Divider before the notifications section
  {
    title: "Notifications",
    icon: Clock,
    link: "/notifications",
  },
  {
    title: "Settings",
    icon: Gear,
    link: "/settings",
  },
  {
    title: "Support",
    icon: FileText,
    link: "/support",
  },
];
