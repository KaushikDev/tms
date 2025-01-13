import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/home";
import CreateTicket from "./pages/createTicket";
import RecentlyDeleted from "./pages/recentlyDeleted";
import ViewTickets from "./pages/viewAllTickets";
import NotFound from "./pages/notFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add-ticket" element={<CreateTicket />} />
        <Route path="/view-all-tickets" element={<ViewTickets />} />
        <Route path="/recently-deleted" element={<RecentlyDeleted />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
