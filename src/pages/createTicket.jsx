import { ticketAction } from "./../store/actions/actionTypes";
import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ASSIGNEES, LABELS } from "./../utilities/constants";


const CreateTicket = () => {
  const { state, dispatch } = useTicketsContext();


  const handleAddTicket = (e) => {
    e.preventDefault();

    if (!state.currentTicket.title && !state.currentTicket.description) {
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
        payload: {
          show: true,
          message: LABELS.CREATE_TICKET_COMBINED_ERROR
        },
      });
    } else if (!state.currentTicket.title) {
      dispatch({
        type: ticketAction.SET_ERROR_TITLE,
        payload: LABELS.NO_TITLE_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_TITLE_ERROR, },
      });
    } else if (!state.currentTicket.description) {
      dispatch({
        type: ticketAction.SET_ERROR_DESCRIPTION,
        payload: LABELS.NO_DESCRIPTION_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_DESCRIPTION_ERROR, },
      });
    } else if (
      state.currentTicket.title.trim() &&
      state.currentTicket.description.trim() &&
      !state.error.title &&
      !state.error.description
    ) {
      dispatch({
        type: ticketAction.ADD_NEW_TICKET,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.TICKET_SAVED },
      });
      dispatch({ type: ticketAction.RESET_ERROR });
     
    }
  };

  const handleCurrentTicketTitle = (e) => {
    e.target.value
      ? dispatch({ type: ticketAction.SET_ERROR_TITLE, payload: "" })
      : null;
    dispatch({
      type: ticketAction.CURRENT_TICKET_TITLE,
      payload: e.target.value,
    });
  };

  const handleCurrentTicketDescription = (e) => {
    e.target.value
      ? dispatch({ type: ticketAction.SET_ERROR_DESCRIPTION, payload: "" })
      : null;
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
    <div className="h-full flex flex-col items-center justify-between p-4 bg-white-50 ">
      <div>
        {" "}
        <h2 className="text-4xl font-bold mb-4">{LABELS.CREATE_NEW_TICKET}</h2>
      </div>

      <form onSubmit={handleAddTicket} className="w-full flex flex-1 justify-center flex-col gap-6">
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
            className={`w-full p-3 border ${
              state.error.description ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
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
