import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS } from "../utilities/constants";
import { ROUTES } from "../utilities/routes";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { ticketAction } from "../store/actions/actionTypes";
import PieGraph from "../components/graphs/pieGraph";
import Button from "../components/elements/button";
import { FaTicketAlt, FaTrashAlt, FaClock, FaUserSlash } from "react-icons/fa";

const Dashboard = () => {
  const { state, dispatch } = useTicketsContext();
  const navigate = useNavigate();

  // Auto-import data on component mount if not already imported
  useEffect(() => {
    if (!state.import.status) {
      dispatch({ type: ticketAction.IMPORT_DUMMY_DATA });
    }
  }, [state.import.status, dispatch]);

  const [pieGraphData, setPieGraphData] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    active: 0,
    deleted: 0,
    unassigned: 0,
  });

  useEffect(() => {
    setPieGraphData([
      { name: "Active Tickets", value: state.tickets.length },
      { name: "Deleted Tickets", value: state.recentlyDeleted.length },
    ]);

    // Calculate actual unassigned tickets (where assignedTo is empty or missing)
    const unassignedCount = state.tickets.filter(
      (t) => !t.assignedTo || t.assignedTo.trim() === "",
    ).length;

    setMetrics({
      total: state.tickets.length + state.recentlyDeleted.length,
      active: state.tickets.length,
      deleted: state.recentlyDeleted.length,
      unassigned: unassignedCount,
    });
  }, [state.tickets, state.recentlyDeleted]);

  const handleCTAClick = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <div className="min-h-full flex flex-col p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            {LABELS.MAIN_HEADING_DASHBOARD || "Command Center"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {LABELS.SUB_HEADING_DASHBOARD ||
              "System overview and ticket metrics."}
          </p>
        </div>
        <Button
          id="create-ticket-btn"
          type="button"
          isDisabled={false}
          label={LABELS.CREATE_NEW_TICKET || "+ New Ticket"}
          onClickHandler={handleCTAClick}
          className="shadow-lg hover:shadow-xl transition-shadow"
        />
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard
          title="Total Tickets"
          value={metrics.total}
          icon={<FaTicketAlt className="text-blue-500" />}
          subtitle="All time records"
          onClick={() => navigate(ROUTES.VIEW)}
        />
        <MetricCard
          title="Active Issues"
          value={metrics.active}
          icon={<FaClock className="text-yellow-500" />}
          subtitle="Requires resolution"
          onClick={() => navigate(ROUTES.VIEW)}
        />
        <MetricCard
          title="Unassigned"
          value={metrics.unassigned}
          icon={<FaUserSlash className="text-orange-500" />}
          subtitle="Needs an owner"
          onClick={() => navigate(ROUTES.VIEW)}
        />
        <MetricCard
          title="Resolved/Deleted"
          value={metrics.deleted}
          icon={<FaTrashAlt className="text-red-500" />}
          subtitle="Archived tickets"
          onClick={() => navigate(ROUTES.DELETED)}
        />
      </div>

      {/* Charts & Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Expanded) */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-center items-center min-h-[350px]">
          {/* Future Recharts Line/Bar chart goes here */}
          <h3 className="text-xl font-semibold mb-4 self-start w-full border-b border-gray-100 dark:border-gray-700 pb-2">
            Ticket Volume
          </h3>
          <div className="text-gray-400 italic">
            Advanced Analytics Chart Placeholder
          </div>
        </div>

        {/* Pie Graph Area */}
        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center min-h-[350px]">
          <h3 className="text-xl font-semibold w-full text-left mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
            Distribution
          </h3>
          <div className="flex-1 w-full flex justify-center items-center">
            {metrics.total > 0 ? (
              <PieGraph pieGraphData={pieGraphData} />
            ) : (
              <span className="text-gray-400">Loading metrics...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const MetricCard = ({ title, value, icon, subtitle, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-md hover:border-blue-500/50 transition-all cursor-pointer transform hover:-translate-y-1"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
        {title}
      </h3>
      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">{icon}</div>
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </h2>
      <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
    </div>
  </div>
);

export default Dashboard;
