import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TicketsProvider from "./context/TicketsContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TicketsProvider>
        <Router>
          <App />
        </Router>
      </TicketsProvider>
    </AuthProvider>
  </StrictMode>
);
