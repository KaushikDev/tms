import { useMemo, useEffect } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { ticketAction } from "../store/actions/actionTypes";
import { LABELS } from "../utilities/constants";

import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const Archive = () => {
  const { state, dispatch } = useTicketsContext();

  useEffect(() => {
    if (!state.import?.status) {
      dispatch({ type: ticketAction.IMPORT_DUMMY_DATA });
    }
  }, [state.import?.status, dispatch]);

  const handleRestoreTicket = (ticket) => {
    const restoredTicket = { ...ticket, status: "TODO" };
    dispatch({ type: ticketAction.ADD_NEW_TICKET, payload: restoredTicket });
    dispatch({
      type: ticketAction.REMOVE_FROM_ARCHIVED_LIST,
      payload: ticket.id,
    });
    dispatch({
      type: ticketAction.RAISE_TOAST,
      payload: { show: true, message: "Ticket restored to Backlog." },
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
        filter: true,
        floatingFilter: true,
        cellRenderer: (params) => {
          const s = params.value === "RESOLVED" ? "RESOLVED" : "DELETED";
          const color =
            s === "RESOLVED"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

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
        headerName: "Archived By",
        width: 140,
        valueGetter: () => "System Admin",
        cellClass: "text-gray-500 italic",
      },
      {
        headerName: "Archived On",
        width: 180,
        sortable: true,
        valueGetter: (params) =>
          params.data.resolvedOn ||
          params.data.archivedOn ||
          params.data.createdOn,
      },
      {
        headerName: "Actions",
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: (params) => (
          <div className="flex items-center gap-2 pt-1.5">
            <button
              onClick={() => handleRestoreTicket(params.data)}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 text-xs font-semibold transition-colors dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
            >
              Restore
            </button>
          </div>
        ),
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
          All Archived(Deleted/Resolved) Tickets
        </h1>
        <p className="text-gray-500 mt-1">
          Audit log of all resolved and deleted system tickets.
        </p>
      </div>

      <div className="flex flex-col flex-1 w-full">
        <div className="flex-1 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {state.archive && state.archive.length > 0 ? (
            <div className="w-full h-[600px]">
              <AgGridReact
                theme={themeQuartz}
                rowData={state.archive.slice().reverse()}
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
                {LABELS.NO_ARCHIVED_TICKETS || "Archive is currently empty."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
