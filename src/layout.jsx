

import { Outlet } from "react-router-dom"; // Outlet is where the nested route content will be rendered
import Header from "./components/general/header";
import Footer from "./components/general/footer";
import Toast from "./components/general/toast";
import { useTicketsContext } from "./hooks/useTicketsContext";

const Layout = () => {
      const { state } = useTicketsContext();
  return (
    <div className="w-screen flex flex-col max-w-full h-screen">
      <Header /> 
      <main className="my-16 container w-full flex-1 flex">
        <Outlet /> {/* The current route content will be rendered here */}
      </main>
      <Footer /> 
      {state.toast.show && <Toast message={state.toast.message} />}
    </div>
  );
};

export default Layout;
