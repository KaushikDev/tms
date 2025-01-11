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
    <div className="w-screen flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
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
        {/* <section className="p-4 bg-white">
          <AddTicket />
        </section>
        <section className="p-4 bg-white">
          <ViewTickets allTickets={state.tickets} />
        </section>
        <section className="p-4 bg-white">
          <RecentlyDeleted deletedTickets={state.recentlyDeleted} />
        </section> */}
      </main>
      <Footer />
      {state.toast.show && <Toast message={state.toast.message} />}
    </div>
  );
}

export default App;
