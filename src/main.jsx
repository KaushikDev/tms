import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TicketsProvider from "./context/TicketsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TicketsProvider>
      <App />
    </TicketsProvider>
  </StrictMode>
);
