import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";


import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />


      <div className="flex-1 p-4">
        <Header />
        <Dashboard />
      </div>
    </div>
  </StrictMode>
);

