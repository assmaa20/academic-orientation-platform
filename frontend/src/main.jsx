import { createRoot } from "react-dom/client";

import "./styles/global.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext"; // adapte le chemin si nécessaire

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </AuthProvider>
);