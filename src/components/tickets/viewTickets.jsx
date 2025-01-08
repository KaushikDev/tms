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
    <div key={index} className="card flex-row items-center justify-center">
      {!(
        state.ticketToUpdate.inProgress &&
        ticket.id === state.ticketToUpdate.oldValue.id
      ) ? (
        <>
          <div>
            <h2>Title : {ticket.title}</h2>
            <h3>Description : {ticket.description}</h3>
            <p>Assigned to : {ticket.assignedTo}</p>
          </div>
          <button onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
          <button onClick={() => handleTicketUpdate(ticket)}>Update</button>
        </>
      ) : (
        <form onSubmit={handleEditTicket} className="gap-2">
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
          <button type="submit">Save</button>
          <button
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
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  ));

  return (
    <div className="container">
      {state.tickets.length ? (
        <div className="p-2 m-2 border">{displayAllTickets}</div>
      ) : (
        <h3>No Tickets Added!</h3>
      )}
    </div>
  );
};

export default ViewTickets;
