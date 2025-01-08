import "./App.css";
import AddTicket from "./components/tickets/addTicket";
import ViewTickets from "./components/tickets/viewTickets";

function App() {
  return (
    <div className="container max-w-screen-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <header className="text-center py-4 mb-6 bg-blue-600 text-white rounded shadow">
        <h1 className="text-2xl font-bold">Ticket Management System</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-4 bg-white rounded-lg shadow">
          <AddTicket />
        </section>
        <section className="p-4 bg-white rounded-lg shadow">
          <ViewTickets />
        </section>
      </main>
    </div>
  );
}

export default App;
