import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/home";
import CreateTicket from "./pages/createTicket";
import RecentlyDeleted from "./pages/recentlyDeleted";
import ViewTickets from "./pages/viewAllTickets";
import { useTicketsContext } from "./hooks/useTicketsContext";

function App() {
  const { state } = useTicketsContext();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add-ticket" element={<CreateTicket />} />
        <Route
          path="/view-all-tickets"
          element={<ViewTickets allTickets={state.tickets} />}
        />
        <Route
          path="/recently-deleted"
          element={<RecentlyDeleted deletedTickets={state.recentlyDeleted} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
