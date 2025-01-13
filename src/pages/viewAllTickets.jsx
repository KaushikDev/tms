import { useNavigate } from "react-router-dom";
import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ticketAction } from "./../store/actions/actionTypes";
import { ASSIGNEES, LABELS } from "./../utilities/constants";

const ViewAllTickets = () => {
  const { state, dispatch } = useTicketsContext();
  const navigate = useNavigate();
  const handleDeleteTicket = (ticket) => {
    (async () => {
      await dispatch({
        type: ticketAction.DELETE_THIS_TICKET,
        payload: ticket.id,
      });
      await dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: "Ticket is deleted!" },
      });
    })();
    dispatch({
      type: ticketAction.ADD_TO_DELETE_LIST,
      payload: ticket,
    });
    navigate("/recently-deleted");
  };

  const handleEditTicket = (e) => {
    e.preventDefault();
    if (
      !state.ticketToUpdate.newValue.title &&
      !state.ticketToUpdate.newValue.description
    ) {
      dispatch({
        type: ticketAction.SET_ERROR_TITLE,
        payload: "Title cannot be empty!",
      });
      dispatch({
        type: ticketAction.SET_ERROR_DESCRIPTION,
        payload: "Description cannot be empty!",
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: {
          show: true,
          message: "Title & Description cannot be empty!",
        },
      });
    } else if (!state.ticketToUpdate.newValue.title) {
      dispatch({
        type: ticketAction.SET_ERROR_TITLE,
        payload: "Title cannot be empty!",
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: "Title cannot be empty!" },
      });
    } else if (!state.ticketToUpdate.newValue.description) {
      dispatch({
        type: ticketAction.SET_ERROR_DESCRIPTION,
        payload: "Description cannot be empty!",
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: "Description cannot be empty!" },
      });
    } else if (
      state.ticketToUpdate.newValue.title.trim() &&
      state.ticketToUpdate.newValue.description.trim() &&
      !state.error.title &&
      !state.error.description
    ) {
      dispatch({
        type: ticketAction.UPDATE_THIS_TICKET,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: "Ticket is updated!" },
      });
      dispatch({ type: ticketAction.RESET_ERROR });
    }
  };

  const handleChangeUpdateTicket = (e, field) => {
    e.target.value && field === "title"
      ? dispatch({ type: ticketAction.SET_ERROR_TITLE, payload: "" })
      : null;
    e.target.value && field === "description"
      ? dispatch({ type: ticketAction.SET_ERROR_DESCRIPTION, payload: "" })
      : null;
    dispatch({
      type: ticketAction.TICKET_TO_UPDATE_CHANGES,
      payload: { field, value: e.target.value },
    });
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

  const displayAllTickets = state.tickets
    .map((ticket, index) => (
      <div
        key={index}
        className="card flex flex-col gap-4 px-4 mb-4 bg-gray-100 hover:shadow-md rounded-lg border border-gray-200"
      >
        {!(
          state.ticketToUpdate.inProgress &&
          ticket.id === state.ticketToUpdate.oldValue.id
        ) ? (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-800">
                <span className="text-gray-400 font-small">[{ticket.id}]</span>{" "}
              </h2>
              <p className="text-gray-700">
                <strong>Title:</strong> {ticket.title}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {ticket.description}
              </p>
              <p className="text-gray-700">
                <strong>Assigned To:</strong> {ticket.assignedTo}
              </p>
              <p className="text-gray-700">
                <strong>Created On:</strong> {ticket.createdOn}
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleDeleteTicket(ticket)}
                className="uppercase px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-red-600"
              >
                {LABELS.DELETE_THIS_TICKET}
              </button>
              <button
                onClick={() => handleTicketUpdate(ticket)}
                className="uppercase px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {LABELS.UPDATE_THIS_TICKET}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEditTicket} className="flex flex-col gap-4 p-4">
            <div>
              <label
                htmlFor="ticketTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {LABELS.TITLE}
              </label>
              <input
                id="ticketTitle"
                className={`w-full p-3 border ${
                  state.error.title ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={state.ticketToUpdate.newValue.title}
                placeholder={LABELS.TITLE_PLACEHOLDER}
                onChange={(e) => handleChangeUpdateTicket(e, "title")}
              />
            </div>

            <div>
              <label
                htmlFor="ticketDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {LABELS.DESCRIPTION}
              </label>
              <textarea
                id="ticketDescription"
                className={`w-full p-3 border ${
                  state.error.description ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                value={state.ticketToUpdate.newValue.description}
                placeholder={LABELS.DESCRIPTION_PLACEHOLDER}
                onChange={(e) => handleChangeUpdateTicket(e, "description")}
              />
            </div>

            <div>
              <label
                htmlFor="ticketAssignedTo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {LABELS.ASSIGNED_TO}
              </label>
              <select
                id="ticketAssignedTo"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={state.ticketToUpdate.newValue.assignedTo}
                onChange={(e) => handleChangeUpdateTicket(e, "assignedTo")}
              >
                <option value="" disabled>
                  {LABELS.TO_BE_ASSIGNED}
                </option>
                {ASSIGNEES.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 p-4">
              <button
                type="submit"
                className="uppercase px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                {LABELS.ADD_THIS_TICKET}
              </button>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: ticketAction.TICKET_TO_UPDATE,
                    payload: {
                      inProgress: false,
                      oldValue: {
                        id: "",
                        title: "",
                        description: "",
                        assignedTo: "",
                      },
                      newValue: {
                        id: "",
                        title: "",
                        description: "",
                        assignedTo: "",
                      },
                    },
                  })
                }
                className="uppercase px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                {LABELS.CANCEL_CHANGES}
              </button>
            </div>
          </form>
        )}
      </div>
    ))
    .reverse();

  return (
    <div className="flex flex-col container mx-auto p-4 min-h-[90%] max-h-[90%]">
      {state.tickets.length ? (
        <>
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
            {LABELS.ALL_TICKETS}
          </h2>
          <div className="p-2 max-h-full overflow-y-auto">
            {displayAllTickets}
          </div>
        </>
      ) : (
        <h2 className="stretch text-center  text-xl font-semibold text-gray-800 mb-4">
          No Tickets Added!
        </h2>
      )}
    </div>
  );
};

export default ViewAllTickets;
