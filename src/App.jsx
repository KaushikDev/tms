import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import CreateTicket from "./pages/createTicket";
import RecentlyDeleted from "./pages/recentlyDeleted";
import ViewTickets from "./pages/viewAllTickets";
import NotFound from "./pages/notFound";

import { ROUTES } from "./utilities/routes";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.LAYOUT} element={<Layout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.CREATE} element={<CreateTicket />} />
        <Route path={ROUTES.VIEW} element={<ViewTickets />} />
        <Route path={ROUTES.DELETED} element={<RecentlyDeleted />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
