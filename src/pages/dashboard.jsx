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
  BarChart,
  Bar,
} from "recharts";

const STATUS_COLORS = {
  TODO: "#94a3b8",
  "IN PROGRESS": "#3b82f6",
  DONE: "#f59e0b",
  READY: "#10b981",
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
  const [workloadData, setWorkloadData] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    backlog: 0,
    active: 0,
    resolved: 0,
  });

  useEffect(() => {
    const pipelineTickets = state.tickets || [];
    const resolvedTickets = state.archive || [];

    const backlogCount = pipelineTickets.filter(
      (t) => t.status === "TODO",
    ).length;
    const activeCount = pipelineTickets.filter((t) =>
      ["IN PROGRESS", "DONE", "READY"].includes(t.status),
    ).length;

    setMetrics({
      total: pipelineTickets.length + resolvedTickets.length,
      backlog: backlogCount,
      active: activeCount,
      resolved: resolvedTickets.length,
    });

    const statusCounts = { "IN PROGRESS": 0, DONE: 0, READY: 0 };
    pipelineTickets.forEach((t) => {
      if (statusCounts[t.status] !== undefined) statusCounts[t.status]++;
    });
    setPieGraphData(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        value: statusCounts[key],
      })),
    );

    const workloadCounts = {};
    pipelineTickets.forEach((t) => {
      if (
        t.assignedTo &&
        t.assignedTo !== "Unassigned" &&
        t.status !== "TODO"
      ) {
        workloadCounts[t.assignedTo] = (workloadCounts[t.assignedTo] || 0) + 1;
      }
    });

    const sortedWorkload = Object.keys(workloadCounts)
      .map((k) => ({ name: k.split(" ")[0], tickets: workloadCounts[k] }))
      .sort((a, b) => b.tickets - a.tickets)
      .slice(0, 6);
    setWorkloadData(sortedWorkload);

    setRecentTickets(pipelineTickets.slice().reverse().slice(0, 5));
  }, [state.tickets, state.archive]);

  const chartData = useMemo(() => {
    const pipelineTickets = state.tickets || [];
    const resolvedTickets = state.archive || [];
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
  }, [state.tickets, state.archive]);

  return (
    <div className="min-h-full w-full flex flex-col p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track ticket velocity, active workloads, and recent updates
          </p>
        </div>
        <Button
          id="create-ticket-btn"
          type="button"
          label="+ Add Ticket"
          onClickHandler={() => navigate(ROUTES.CREATE)}
          className="shadow-lg hover:shadow-xl transition-shadow px-6"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          subtitle="Awaiting assignment"
          onClick={() =>
            navigate(ROUTES.VIEW, { state: { filter: "UNASSIGNED" } })
          }
        />
        <MetricCard
          title="Active Cycle"
          value={metrics.active}
          icon={<FaClock className="text-blue-500" />}
          subtitle="Currently in progress"
          onClick={() => navigate(ROUTES.VIEW, { state: { filter: "ACTIVE" } })}
        />
        <MetricCard
          title="Archived"
          value={metrics.resolved}
          icon={<FaCheckCircle className="text-emerald-500" />}
          subtitle="Resolved or deleted"
          onClick={() => navigate(ROUTES.ARCHIVED)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[380px] flex flex-col">
          <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200">
            Velocity (30 Day Trend)
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
                  opacity={0.15}
                />
                <XAxis
                  dataKey="displayDate"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  dy={10}
                  minTickGap={20}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(107, 114, 128, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                  }}
                  itemStyle={{ color: "#f8fafc", fontWeight: 600 }}
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

        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[380px] flex flex-col items-center relative">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200 w-full text-center">
            Active Distribution
          </h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieGraphData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {pieGraphData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
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
                    {metrics.active}
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.5em"
                    className="text-[10px] font-bold uppercase tracking-widest fill-gray-500"
                  >
                    In Cycle
                  </tspan>
                </text>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#f8fafc", fontWeight: 600 }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-gray-600 dark:text-gray-400 text-xs font-semibold">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[350px] flex flex-col">
          <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200">
            Developer Workload (Top 6)
          </h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={workloadData}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#374151"
                  opacity={0.15}
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 600 }}
                  width={70}
                />
                <Tooltip
                  cursor={{ fill: "rgba(107, 114, 128, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#3b82f6", fontWeight: 600 }}
                />
                <Bar
                  dataKey="tickets"
                  fill="#3b82f6"
                  radius={[0, 6, 6, 0]}
                  barSize={24}
                  name="Active Tickets"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Recent Tickets
            </h3>
            <button
              onClick={() =>
                navigate(ROUTES.VIEW, { state: { filter: "ALL" } })
              }
              className="text-xs font-bold text-indigo-500 hover:text-indigo-600 uppercase tracking-wider"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
              >
                <div
                  className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${ticket.status === "TODO" ? "bg-slate-400" : "bg-blue-500"}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {ticket.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {ticket.assignedTo && ticket.assignedTo !== "Unassigned"
                      ? ticket.assignedTo
                      : "Unassigned"}{" "}
                    • {ticket.createdOn.split(",")[0]}
                  </p>
                </div>
              </div>
            ))}
            {recentTickets.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-8">
                No recent activity.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, subtitle, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-lg hover:border-indigo-500/30 transition-all cursor-pointer transform hover:-translate-y-1"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
        {title}
      </h3>
      <div className="p-2 bg-indigo-50 dark:bg-gray-700/50 rounded-xl">
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
