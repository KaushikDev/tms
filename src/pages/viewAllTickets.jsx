import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ticketAction } from "./../store/actions/actionTypes";
import { ASSIGNEES, LABELS } from "./../utilities/constants";

// eslint-disable-next-line react/prop-types
const ViewAllTickets = ({ allTickets }) => {
  const { state, dispatch } = useTicketsContext();

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
    console.log(allTickets);
    dispatch({
      type: ticketAction.ADD_TO_DELETE_LIST,
      payload: ticket,
    });
  };

  const handleEditTicket = (e) => {
    e.preventDefault();
    dispatch({
      type: ticketAction.UPDATE_THIS_TICKET,
    });
    dispatch({
      type: ticketAction.RAISE_TOAST,
      payload: { show: true, message: "Ticket is updated!" },
    });
  };

  const handleChangeUpdateTicket = (e, field) => {
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

  const displayAllTickets = state.tickets.map((ticket, index) => (
    <div
      key={index}
      className="card flex flex-col gap-4 p-4 mb-4 bg-gray-100 shadow-md rounded-lg border border-gray-200 hover:shadow-lg"
    >
      {!(
        state.ticketToUpdate.inProgress &&
        ticket.id === state.ticketToUpdate.oldValue.id
      ) ? (
        <div className="flex justify-between items-center p-4 ">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              <span className="text-gray-400 font-small">
                [{ticket.createdOn}]
              </span>{" "}
              {ticket.title}
            </h2>
            <h3 className="text-base text-gray-600 leading-relaxed">
              {ticket.description}
            </h3>
            <p className="text-sm text-gray-500">{ticket.assignedTo}</p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleDeleteTicket(ticket)}
              className="px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-red-600"
            >
              {LABELS.DELETE_THIS_TICKET}
            </button>
            <button
              onClick={() => handleTicketUpdate(ticket)}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {LABELS.UPDATE_THIS_TICKET}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleEditTicket} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="ticketTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {LABELS.TITLE}
            </label>
            <input
              id="ticketTitle"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
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
              className="px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              {LABELS.CANCEL_CHANGES}
            </button>
          </div>
        </form>
      )}
    </div>
  ));

  return (
    <div className="container mx-auto p-4 bg-white-50 rounded-lg shadow-md max-h-[500px] overflow-y-auto">
      {state.tickets.length ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {LABELS.ALL_TICKETS}
          </h2>
          <div className="space-y-4">{displayAllTickets}</div>
        </>
      ) : (
        <h3 className="text-center text-gray-500">No Tickets Added!</h3>
      )}
    </div>
  );
};

export default ViewAllTickets;
