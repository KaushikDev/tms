import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utilities/routes";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { ticketAction } from "../store/actions/actionTypes";
import Button from "../components/elements/button";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  TODO: "#94a3b8", // Slate 400
  "IN PROGRESS": "#3b82f6", // Blue 500
  DONE: "#f59e0b", // Amber 500
  READY: "#10b981", // Emerald 500
};

const Dashboard = () => {
  const { state, dispatch } = useTicketsContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.import?.status) {
      dispatch({ type: ticketAction.IMPORT_DUMMY_DATA });
    }
  }, [state.import?.status, dispatch]);

  const [pieGraphData, setPieGraphData] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    backlog: 0,
    active: 0,
    resolved: 0,
  });

  useEffect(() => {
    const pipelineTickets = state.tickets || [];
    const resolvedTickets = state.recentlyDeleted || [];

    // Calculate Donut Chart Data (Full Unresolved Pipeline)
    const statusCounts = { TODO: 0, "IN PROGRESS": 0, DONE: 0, READY: 0 };
    pipelineTickets.forEach((t) => {
      if (statusCounts[t.status] !== undefined) statusCounts[t.status]++;
    });

    const orderedStatusData = Object.keys(statusCounts).map((key) => ({
      name: key,
      value: statusCounts[key],
    }));

    setPieGraphData(orderedStatusData);

    const backlogCount = pipelineTickets.filter(
      (t) => t.status === "TODO",
    ).length;
    const activeCount = pipelineTickets.filter((t) =>
      ["IN PROGRESS", "DONE", "READY"].includes(t.status),
    ).length;

    setMetrics({
      total: pipelineTickets.length + resolvedTickets.length, // 500
      backlog: backlogCount, // 108
      active: activeCount, // 312
      resolved: resolvedTickets.length, // 80
    });
  }, [state.tickets, state.recentlyDeleted]);

  // Chart logic (Area graph)
  const chartData = useMemo(() => {
    const pipelineTickets = state.tickets || [];
    const resolvedTickets = state.recentlyDeleted || [];
    const last30Days = [...Array(30)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return {
        fullDate: d,
        displayDate: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        created: 0,
        resolved: 0,
      };
    });

    const parseCustomDate = (dateStr) => {
      if (!dateStr) return null;
      const [datePart] = dateStr.split(", ");
      const [day, month, year] = datePart.split("/");
      return new Date(year, month - 1, day);
    };

    [...pipelineTickets, ...resolvedTickets].forEach((ticket) => {
      const ticketDate = parseCustomDate(ticket.createdOn);
      if (ticketDate) {
        const match = last30Days.find(
          (d) =>
            d.fullDate.getDate() === ticketDate.getDate() &&
            d.fullDate.getMonth() === ticketDate.getMonth(),
        );
        if (match) match.created += 1;
      }
    });

    resolvedTickets.forEach((ticket) => {
      const resDate = parseCustomDate(ticket.resolvedOn);
      if (resDate) {
        const match = last30Days.find(
          (d) =>
            d.fullDate.getDate() === resDate.getDate() &&
            d.fullDate.getMonth() === resDate.getMonth(),
        );
        if (match) match.resolved += 1;
      }
    });

    return last30Days;
  }, [state.tickets, state.recentlyDeleted]);

  return (
    <div className="min-h-full w-full flex flex-col p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Command Center
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Lifecycle monitoring and resource allocation.
          </p>
        </div>
        <Button
          id="create-ticket-btn"
          type="button"
          label="+ New Ticket"
          onClickHandler={() => navigate(ROUTES.CREATE)}
          className="shadow-lg hover:shadow-xl transition-shadow"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard
          title="Total Pool"
          value={metrics.total}
          icon={<FaTicketAlt className="text-indigo-500" />}
          subtitle="Cumulative tickets"
          onClick={() => navigate(ROUTES.VIEW, { state: { filter: "ALL" } })}
        />
        <MetricCard
          title="Backlog"
          value={metrics.backlog}
          icon={<FaClipboardList className="text-amber-500" />}
          subtitle="Yet to be picked up"
          onClick={() =>
            navigate(ROUTES.VIEW, { state: { filter: "UNASSIGNED" } })
          }
        />
        <MetricCard
          title="Active"
          value={metrics.active}
          icon={<FaClock className="text-blue-500" />}
          subtitle="Assigned & in cycle"
          onClick={() => navigate(ROUTES.VIEW, { state: { filter: "ACTIVE" } })}
        />
        <MetricCard
          title="Resolved"
          value={metrics.resolved}
          icon={<FaCheckCircle className="text-emerald-500" />}
          subtitle="Verified & Closed"
          onClick={() => navigate(ROUTES.DELETED)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Velocity Area Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[400px] flex flex-col">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            Velocity (Last 30 Days)
          </h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorResolved"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="displayDate"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  dy={10}
                  minTickGap={20}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#f8fafc", fontWeight: 600 }}
                  labelStyle={{
                    color: "#9ca3af",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="created"
                  stroke="#6366f1"
                  fill="url(#colorCreated)"
                  strokeWidth={3}
                  name="Opened"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  fill="url(#colorResolved)"
                  strokeWidth={3}
                  name="Resolved"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Donut Chart */}
        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[400px] flex flex-col items-center relative">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 w-full text-center">
            Active Tickets Status
          </h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieGraphData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieGraphData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>

                {/* Native SVG Centering - Mathematically locked to the Donut */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x="50%"
                    dy="-0.1em"
                    className="text-4xl font-black fill-gray-900 dark:fill-white"
                  >
                    {metrics.backlog + metrics.active}
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.5em"
                    className="text-xs font-medium uppercase tracking-widest fill-gray-500 dark:fill-gray-400"
                  >
                    Active
                  </tspan>
                </text>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#f8fafc", fontWeight: 600 }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, subtitle, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer transform hover:-translate-y-1"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
        {title}
      </h3>
      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        {icon}
      </div>
    </div>
    <div>
      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-1">
        {value}
      </h2>
      <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
    </div>
  </div>
);

export default Dashboard;
