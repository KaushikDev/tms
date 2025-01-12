import { ticketAction } from "./../store/actions/actionTypes";
import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ASSIGNEES, LABELS } from "./../utilities/constants";

const CreateTicket = () => {
  const { state, dispatch } = useTicketsContext();

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (
      state.currentTicket.title.trim() &&
      state.currentTicket.description.trim()
    ) {
      dispatch({
        type: ticketAction.ADD_NEW_TICKET,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: "Ticket is saved!" },
      });
    }
  };

  const handleCurrentTicketTitle = (e) => {
    dispatch({
      type: ticketAction.CURRENT_TICKET_TITLE,
      payload: e.target.value,
    });
  };

  const handleCurrentTicketDescription = (e) => {
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

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {LABELS.CREATE_NEW_TICKET}
      </h2>
      <form onSubmit={handleAddTicket} className="flex flex-col gap-6">
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
            value={state.currentTicket.title}
            placeholder={LABELS.TITLE_PLACEHOLDER}
            onChange={handleCurrentTicketTitle}
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
            value={state.currentTicket.description}
            placeholder={LABELS.DESCRIPTION_PLACEHOLDER}
            onChange={handleCurrentTicketDescription}
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
            value={state.currentTicket.assignedTo}
            onChange={handleCurrentTicketAssignedTo}
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

        <button
          type="submit"
          className="uppercase w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
        >
          {LABELS.ADD_THIS_TICKET}
        </button>
      </form>


    </div>
  );
};

export default CreateTicket;
