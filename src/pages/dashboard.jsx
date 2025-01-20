import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS } from "../utilities/constants";
import { ROUTES } from "../utilities/routes";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { ticketAction } from "../store/actions/actionTypes";
import { useEffect } from "react";
import PieGraph from "../components/graphs/pieGraph";

const Dashboard = () => {
  const { state, dispatch } = useTicketsContext();
  const [pieGraphData, setPieGraphData] = useState([
    { name: "Active Tickets", value: state.tickets.length },
    { name: "Deleted Tickets", value: state.recentlyDeleted.length },
  ]);
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate(ROUTES.CREATE);
  };

  const handleDataImport = () => {
    dispatch({ type: ticketAction.IMPORT_DUMMY_DATA });
  };

  useEffect(() => {

      setPieGraphData([
        { name: "Active Tickets", value: state.tickets.length },
        { name: "Deleted Tickets", value: state.recentlyDeleted.length },
      ]);
    
  }, [state.tickets, state.recentlyDeleted]);

  return (
    <div className="h-full flex flex-col items-center justify-between text-center p-4 bg-white-50 ">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          {LABELS.MAIN_HEADING_DASHBOARD}{" "}
          {!state.import.status ? (
            <button
              className="p-3 bg-blue-500 text-sm text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
              onClick={handleDataImport}
            >
              {LABELS.IMPORT_DUMMY_DATA}
            </button>
          ) : null}
        </h1>
        <p className="text-lg mb-6">{LABELS.SUB_HEADING_DASHBOARD}</p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <PieGraph pieGraphData={pieGraphData} />
      </section>
      {/* <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <div className="flex flex-row items-center justify-center w-full gap-4 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-medium text-gray-600">Total tickets</h2>
          <p className="text-3xl font-bold text-green-600">
            {state.tickets.length}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-4 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-medium text-gray-600">
            Total assigned tickets{" "}
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {state.tickets.filter((item) => item.assignedTo !== "").length}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-4 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-medium text-gray-600">
            Total deleted tickets{" "}
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {state.recentlyDeleted.length}
          </p>
        </div>
      </section> */}
      <div className="flex flex-col gap-4">
        <button
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
          onClick={handleCTAClick}
        >
          {LABELS.CREATE_NEW_TICKET}{" "}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
