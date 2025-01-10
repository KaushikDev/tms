import "./App.css";
import Toast from "./components/general/toast";
import AddTicket from "./components/tickets/addTicket";
import RecentlyDeleted from "./components/tickets/recentlyDeleted";
import ViewTickets from "./components/tickets/viewTickets";
import { useTicketsContext } from "./hooks/useTicketsContext";

function App() {
  const { state } = useTicketsContext();

  return (
    <div className="w-screen flex flex-col min-h-screen">
      <header className="w-full text-center py-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">Ticket Management System</h1>
      </header>
      <main className="flex-grow">
        <section className="p-4 bg-white">
          <AddTicket />
        </section>
        <section className="p-4 bg-white">
          <ViewTickets allTickets={state.tickets}/>
        </section>
        <section className="p-4 bg-white">
          <RecentlyDeleted deletedTickets={state.recentlyDeleted}/>
        </section>
      </main>
      <footer className="w-full text-center py-4 bg-black text-white">
        <h1 className="text-2xl font-bold">
          2025. KaushikDev. All rights reserved.
        </h1>
      </footer>
      {state.toast.show && <Toast message={state.toast.message}/>}
    </div>
  );
}

export default App;
