import { useEffect, useState } from "react";
import { ticketAction } from "./../store/actions/actionTypes";
import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ASSIGNEES, LABELS } from "./../utilities/constants";
import Input from "../components/elements/input";
import Select from "../components/elements/select";
import Button from "../components/elements/button";

const ACTIVE_STATUS_OPTIONS = ["IN PROGRESS", "DONE", "READY"];

const CreateTicket = () => {
  const { state, dispatch } = useTicketsContext();
  const [isLoaded, setIsLoaded] = useState(false);

  const currentStatus = state.currentTicket.status || "TODO";
  const isBacklog = currentStatus === "TODO";

  useEffect(() => {
    const draft = sessionStorage.getItem("ticketDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        if (parsedDraft.title)
          dispatch({
            type: ticketAction.CURRENT_TICKET_TITLE,
            payload: parsedDraft.title,
          });
        if (parsedDraft.description)
          dispatch({
            type: ticketAction.CURRENT_TICKET_DESCRIPTION,
            payload: parsedDraft.description,
          });
        if (parsedDraft.assignedTo)
          dispatch({
            type: ticketAction.CURRENT_TICKET_ASSIGNED_TO,
            payload: parsedDraft.assignedTo,
          });
        if (parsedDraft.status)
          dispatch({
            type: ticketAction.CURRENT_TICKET_STATUS,
            payload: parsedDraft.status,
          });
      } catch (e) {
        console.error("Failed to parse ticket draft from session storage.", e);
      }
    }
    setIsLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded) {
      sessionStorage.setItem(
        "ticketDraft",
        JSON.stringify(state.currentTicket),
      );
    }
  }, [state.currentTicket, isLoaded]);

  const handleAddTicket = (e) => {
    e.preventDefault();

    const title = state.currentTicket.title?.trim() || "";
    const description = state.currentTicket.description?.trim() || "";
    const assignedTo = state.currentTicket.assignedTo || "";

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

    sessionStorage.removeItem("ticketDraft");

    if (assignedTo === "Unassigned") {
      dispatch({ type: ticketAction.CURRENT_TICKET_ASSIGNED_TO, payload: "" });
    }

    dispatch({ type: ticketAction.ADD_NEW_TICKET });
    dispatch({
      type: ticketAction.RAISE_TOAST,
      payload: { show: true, message: LABELS.TICKET_SAVED },
    });
    dispatch({ type: ticketAction.RESET_ERROR });
  };

  const handleCurrentTicketTitle = (e) => {
    if (e.target.value)
      dispatch({ type: ticketAction.SET_ERROR_TITLE, payload: "" });
    dispatch({
      type: ticketAction.CURRENT_TICKET_TITLE,
      payload: e.target.value,
    });
  };

  const handleCurrentTicketDescription = (e) => {
    if (e.target.value)
      dispatch({ type: ticketAction.SET_ERROR_DESCRIPTION, payload: "" });
    dispatch({
      type: ticketAction.CURRENT_TICKET_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleCurrentTicketAssignedTo = (e) => {
    dispatch({
      type: ticketAction.CURRENT_TICKET_ASSIGNED_TO,
      payload: e.target.value,
    });
  };

  const handleActiveStatusDropdown = (e) => {
    dispatch({
      type: ticketAction.CURRENT_TICKET_STATUS,
      payload: e.target.value,
    });
  };

  const setPipelineStage = (stage) => {
    if (stage === "BACKLOG") {
      dispatch({ type: ticketAction.CURRENT_TICKET_STATUS, payload: "TODO" });
    } else {
      dispatch({
        type: ticketAction.CURRENT_TICKET_STATUS,
        payload: "IN PROGRESS",
      });

      if (
        !state.currentTicket.assignedTo ||
        state.currentTicket.assignedTo === "Unassigned"
      ) {
        dispatch({
          type: ticketAction.CURRENT_TICKET_ASSIGNED_TO,
          payload: ASSIGNEES[0],
        });
      }
    }
  };

  return (
    <div className="min-h-full w-full flex flex-col p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="mb-8 w-full max-w-3xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {LABELS.CREATE_NEW_TICKET || "Create Ticket"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Submit a new issue to the system. Your progress is auto-saved.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleAddTicket} className="flex flex-col gap-6">
          <Input
            htmlFor={"ticketTitle"}
            label={LABELS.TITLE || "Title"}
            id={"ticketTitle"}
            error={state.error.title}
            type={"text"}
            name={"title"}
            placeholder={LABELS.TITLE_PLACEHOLDER || "Enter ticket title"}
            value={state.currentTicket.title}
            onChangeHandler={handleCurrentTicketTitle}
            maxLength={80}
          />
          <Input
            htmlFor={"ticketDescription"}
            label={LABELS.DESCRIPTION || "Description"}
            id={"ticketDescription"}
            error={state.error.description}
            type={"text"}
            name={"description"}
            placeholder={
              LABELS.DESCRIPTION_PLACEHOLDER || "Enter ticket details"
            }
            value={state.currentTicket.description}
            onChangeHandler={handleCurrentTicketDescription}
            maxLength={250}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Initial Routing
            </label>
            <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPipelineStage("BACKLOG")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isBacklog ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              >
                Backlog (Unstarted)
              </button>
              <button
                type="button"
                onClick={() => setPipelineStage("ACTIVE")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isBacklog ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              >
                Active Cycle
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <Select
              htmlFor={"ticketAssignedTo"}
              label={LABELS.ASSIGNED_TO || "Assignee"}
              id={"ticketAssignedTo"}
              error={false}
              name={"assignedTo"}
              optionsArr={isBacklog ? ["Unassigned", ...ASSIGNEES] : ASSIGNEES}
              value={state.currentTicket.assignedTo || "Unassigned"}
              onChangeHandler={handleCurrentTicketAssignedTo}
            />

            <div
              className={`transition-opacity duration-300 ${isBacklog ? "opacity-50 pointer-events-none" : "opacity-100"}`}
            >
              <Select
                htmlFor={"ticketStatus"}
                label={"Active Stage"}
                id={"ticketStatus"}
                error={false}
                name={"status"}
                optionsArr={ACTIVE_STATUS_OPTIONS}
                value={isBacklog ? "TODO" : currentStatus}
                onChangeHandler={handleActiveStatusDropdown}
              />
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <Button
              id="createTicket"
              type="submit"
              isDisabled={false}
              label={LABELS.ADD_THIS_TICKET || "Submit Ticket"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
