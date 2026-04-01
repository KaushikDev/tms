import { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ticketAction } from "./../store/actions/actionTypes";
import { ASSIGNEES, LABELS } from "./../utilities/constants";
import Input from "../components/elements/input";
import Select from "../components/elements/select";
import Button from "../components/elements/button";

// AG Grid v33 Imports & Theming
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const ViewAllTickets = () => {
  const { state, dispatch } = useTicketsContext();
  const location = useLocation();

  // Local state to manage the grid filter
  const [currentFilter, setCurrentFilter] = useState("ALL");

  // Catch the route state from the Dashboard cards
  useEffect(() => {
    if (location.state?.filter) {
      setCurrentFilter(location.state.filter);
    }
  }, [location.state]);

  // Import dummy data if empty
  useEffect(() => {
    if (!state.import?.status) {
      dispatch({ type: ticketAction.IMPORT_DUMMY_DATA });
    }
  }, [state.import?.status, dispatch]);

  // Dynamically slice the data based on the selected filter
  const displayData = useMemo(() => {
    const activePipeline = state.tickets || [];
    const resolvedArchive = state.recentlyDeleted || [];

    if (currentFilter === "ACTIVE") {
      return activePipeline.filter((t) =>
        ["IN PROGRESS", "DONE", "READY"].includes(t.status),
      );
    }
    if (currentFilter === "UNASSIGNED") {
      return activePipeline.filter((t) => t.status === "TODO");
    }
    // "ALL" combines the active pipeline and the resolved archive
    return [...activePipeline, ...resolvedArchive];
  }, [state.tickets, state.recentlyDeleted, currentFilter]);

  const handleDeleteTicket = (ticket) => {
    dispatch({ type: ticketAction.DELETE_THIS_TICKET, payload: ticket.id });
    dispatch({
      type: ticketAction.RAISE_TOAST,
      payload: {
        show: true,
        message:
          ticket.status === "RESOLVED"
            ? "Ticket permanently deleted."
            : "Ticket marked as resolved.",
      },
    });
    dispatch({ type: ticketAction.ADD_TO_DELETE_LIST, payload: ticket });
  };

  const handleTicketUpdate = (ticketToBeUpdated) => {
    dispatch({
      type: ticketAction.TICKET_TO_UPDATE,
      payload: {
        inProgress: true,
        oldValue: ticketToBeUpdated,
        newValue: ticketToBeUpdated,
      },
    });
  };

  const handleEditTicket = (e) => {
    e.preventDefault();
    const { title, description } = state.ticketToUpdate.newValue;

    if (!title && !description) {
      dispatch({
        type: ticketAction.SET_ERROR_TITLE,
        payload: LABELS.NO_TITLE_ERROR,
      });
      dispatch({
        type: ticketAction.SET_ERROR_DESCRIPTION,
        payload: LABELS.NO_DESCRIPTION_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.CREATE_TICKET_COMBINED_ERROR },
      });
      return;
    }
    if (!title) {
      dispatch({
        type: ticketAction.SET_ERROR_TITLE,
        payload: LABELS.NO_TITLE_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_TITLE_ERROR },
      });
      return;
    }
    if (!description) {
      dispatch({
        type: ticketAction.SET_ERROR_DESCRIPTION,
        payload: LABELS.NO_DESCRIPTION_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_DESCRIPTION_ERROR },
      });
      return;
    }

    dispatch({ type: ticketAction.UPDATE_THIS_TICKET });
    dispatch({
      type: ticketAction.RAISE_TOAST,
      payload: { show: true, message: LABELS.TICKET_UPDATED },
    });
    dispatch({ type: ticketAction.RESET_ERROR });
  };

  const handleChangeUpdateTicket = (e) => {
    if (e.target.value && e.target.name === "title")
      dispatch({ type: ticketAction.SET_ERROR_TITLE, payload: "" });
    if (e.target.value && e.target.name === "description")
      dispatch({ type: ticketAction.SET_ERROR_DESCRIPTION, payload: "" });

    dispatch({
      type: ticketAction.TICKET_TO_UPDATE_CHANGES,
      payload: { field: [e.target.name], value: e.target.value },
    });
  };

  const handleCancelUpdate = () => {
    dispatch({
      type: ticketAction.TICKET_TO_UPDATE,
      payload: {
        inProgress: false,
        oldValue: { id: "", title: "", description: "", assignedTo: "" },
        newValue: { id: "", title: "", description: "", assignedTo: "" },
      },
    });
  };

  const colDefs = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        valueFormatter: (params) =>
          params.value ? String(params.value).substring(0, 8) : "N/A",
      },
      {
        field: "title",
        headerName: "Title",
        flex: 1,
        filter: true,
        floatingFilter: true,
      },
      {
        field: "assignedTo",
        headerName: "Assignee",
        width: 150,
        filter: true,
        floatingFilter: true,
        valueFormatter: (params) => params.value || "Unassigned",
      },
      {
        headerName: "Status",
        field: "status",
        width: 140,
        cellRenderer: (params) => {
          const s = params.value || "TODO";
          const color =
            s === "READY"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : s === "DONE"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                : s === "IN PROGRESS"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : s === "RESOLVED"
                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

          return (
            <div className="flex items-center h-full pt-1">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}
              >
                {s}
              </span>
            </div>
          );
        },
      },
      {
        field: "createdOn",
        headerName: "Created On",
        width: 180,
        sortable: true,
      },
      {
        headerName: "Actions",
        width: 180,
        sortable: false,
        filter: false,
        cellRenderer: (params) => {
          const isResolved = params.data.status === "RESOLVED";
          return (
            <div className="flex items-center gap-2 pt-1.5">
              {!isResolved ? (
                <>
                  <button
                    onClick={() => handleTicketUpdate(params.data)}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 text-xs font-semibold transition-colors dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTicket(params.data)}
                    className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 text-xs font-semibold transition-colors dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                  >
                    Resolve
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleDeleteTicket(params.data)}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-xs font-semibold transition-colors dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  Delete
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [],
  );

  const defaultColDef = useMemo(
    () => ({ sortable: true, resizable: true }),
    [],
  );

  return (
    <div className="min-h-full w-full flex flex-col p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {LABELS.ALL_TICKETS || "All Issues"}
        </h1>
        <p className="text-gray-500 mt-1">
          Manage, filter, and resolve your system tickets.
        </p>
      </div>

      {state.ticketToUpdate.inProgress && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/50 w-full max-w-3xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Edit Ticket
          </h3>
          <form onSubmit={handleEditTicket} className="flex flex-col gap-4">
            <Input
              htmlFor={"ticketTitle"}
              label={LABELS.TITLE}
              id={"ticketTitle"}
              error={state.error.title}
              type={"text"}
              name={"title"}
              placeholder={LABELS.TITLE_PLACEHOLDER}
              value={state.ticketToUpdate.newValue.title}
              onChangeHandler={handleChangeUpdateTicket}
              maxLength={80}
            />
            <Input
              htmlFor={"ticketDescription"}
              label={LABELS.DESCRIPTION}
              id={"ticketDescription"}
              error={state.error.description}
              type={"text"}
              name={"description"}
              placeholder={LABELS.DESCRIPTION_PLACEHOLDER}
              value={state.ticketToUpdate.newValue.description}
              onChangeHandler={handleChangeUpdateTicket}
              maxLength={250}
            />
            <Select
              htmlFor={"ticketAssignedTo"}
              label={LABELS.ASSIGNED_TO}
              id={"ticketAssignedTo"}
              error={false}
              name={"assignedTo"}
              optionsArr={ASSIGNEES}
              value={state.ticketToUpdate.newValue.assignedTo}
              onChangeHandler={handleChangeUpdateTicket}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button
                id="cancelUpdateTicket"
                type="button"
                btnSecondary
                label={LABELS.CANCEL_CHANGES}
                onClickHandler={handleCancelUpdate}
              />
              <Button
                id="changeTicket"
                type="submit"
                label={LABELS.UPDATE_THIS_TICKET}
              />
            </div>
          </form>
        </div>
      )}

      {!state.ticketToUpdate.inProgress && (
        <div className="flex flex-col flex-1 w-full">
          <div className="flex gap-2 mb-4">
            {[
              { id: "ALL", label: "All Tickets" },
              { id: "ACTIVE", label: "Active (Assigned)" },
              { id: "UNASSIGNED", label: "Backlog (TODO)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  currentFilter === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {displayData.length > 0 ? (
              <div className="w-full h-[600px]">
                <AgGridReact
                  theme={themeQuartz}
                  rowData={displayData.slice().reverse()}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={15}
                  rowHeight={48}
                  headerHeight={48}
                  suppressCellFocus={true}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-lg font-medium">
                  No tickets found for this filter.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllTickets;
