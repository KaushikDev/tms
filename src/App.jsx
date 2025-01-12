import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/general/header";
import Footer from "./components/general/footer";
import Toast from "./components/general/toast";
import Home from "./pages/home";
import CreateTicket from "./pages/createTicket";
import RecentlyDeleted from "./pages/recentlyDeleted";
import ViewTickets from "./pages/viewAllTickets";
import { useTicketsContext } from "./hooks/useTicketsContext";

function App() {
  const { state } = useTicketsContext();

  return (
    <div className="w-screen flex flex-col h-screen">
      <Header />
      <main className="flex flex-col flex-grow container max-w-full items-center justify-center rounded-lg">
        <Routes>
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
        </Routes>
      </main>
      <Footer />
      {state.toast.show && <Toast message={state.toast.message} />}
    </div>
  );
}

export default App;
