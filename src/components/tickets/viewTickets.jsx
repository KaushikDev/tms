import { useTicketsContext } from "../../hooks/useTicketsContext";
import { ticketAction } from "../../store/actions/actionTypes";

const ViewTickets = () => {
  const { state, dispatch } = useTicketsContext();

  const handleDeleteTicket = (ticketID) => {
    dispatch({
      type: ticketAction.DELETE_THIS_TICKET,
      payload: ticketID,
    });
  };

  const handleEditTicket = (e) => {
    e.preventDefault();
    dispatch({
      type: ticketAction.UPDATE_THIS_TICKET,
    });
  };

  const handleChangeUpdateTicket = (e, field) => {
    dispatch({
      type: ticketAction.TICKET_TO_UPDATE,
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
      className="card flex flex-col gap-4 p-4 mb-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg"
    >
      {!(
        state.ticketToUpdate.inProgress &&
        ticket.id === state.ticketToUpdate.oldValue.id
      ) ? (
        <>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              <span className="text-gray-500 font-medium">Title:</span>{" "}
              {ticket.title}
            </h2>
            <h3 className="text-base text-gray-600 leading-relaxed">
              <span className="text-gray-500 font-medium">Description:</span>{" "}
              {ticket.description}
            </h3>
            <p className="text-sm text-gray-500">
              <span className="text-gray-400 font-medium">Assigned to:</span>{" "}
              {ticket.assignedTo}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleDeleteTicket(ticket.id)}
              className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => handleTicketUpdate(ticket)}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEditTicket} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="ticketTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ticket Title
            </label>
            <input
              id="ticketTitle"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.ticketToUpdate.newValue.title}
              placeholder="Enter ticket title"
              onChange={(e) => handleChangeUpdateTicket(e, "title")}
            />
          </div>

          <div>
            <label
              htmlFor="ticketDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ticket Description
            </label>
            <textarea
              id="ticketDescription"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={state.ticketToUpdate.newValue.description}
              placeholder="Enter ticket description"
              onChange={(e) => handleChangeUpdateTicket(e, "description")}
            />
          </div>

          <div>
            <label
              htmlFor="ticketAssignedTo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assigned To
            </label>
            <select
              id="ticketAssignedTo"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.ticketToUpdate.newValue.assignedTo}
              onChange={(e) => handleChangeUpdateTicket(e, "assignedTo")}
            >
              <option value="" disabled>
                Not yet assigned
              </option>
              <option value="Piyush Kaushik">Piyush Kaushik</option>
              <option value="Radhika Sharma">Radhika Sharma</option>
              <option value="Rohit Shukla">Rohit Shukla</option>
              <option value="Koyal Bharadwaj">Koyal Bharadwaj</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Save
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
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  ));

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md max-h-[500px] overflow-y-auto">
      {state.tickets.length ? (
        <div className="space-y-4">{displayAllTickets}</div>
      ) : (
        <h3 className="text-center text-gray-500">No Tickets Added!</h3>
      )}
    </div>
  );
};

export default ViewTickets;
