

import { Outlet } from "react-router-dom"; // Outlet is where the nested route content will be rendered
import Header from "./components/general/header";
import Footer from "./components/general/footer";
import Toast from "./components/general/toast";
import { useTicketsContext } from "./hooks/useTicketsContext";

const Layout = () => {
      const { state } = useTicketsContext();
  return (
    <div className="w-screen flex flex-col h-screen">
      <Header /> 
      <main className="flex flex-col flex-grow container max-w-full max-h-full items-center justify-center rounded-lg overflow-y-auto">
        <Outlet /> {/* The current route content will be rendered here */}
      </main>
      <Footer /> 
      {state.toast.show && <Toast message={state.toast.message} />}
    </div>
  );
};

export default Layout;
