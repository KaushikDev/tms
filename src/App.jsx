import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/home";
import CreateTicket from "./pages/createTicket";
import RecentlyDeleted from "./pages/recentlyDeleted";
import ViewTickets from "./pages/viewAllTickets";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./components/auth/protectedRoute";
import { ROUTES } from "./utilities/routes";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.LAYOUT} element={<Layout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CREATE}
          element={
            <ProtectedRoute>
              <CreateTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.VIEW}
          element={
            <ProtectedRoute>
              <ViewTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.DELETED}
          element={
            <ProtectedRoute>
              <RecentlyDeleted />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
