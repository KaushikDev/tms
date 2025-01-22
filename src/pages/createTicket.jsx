import { ticketAction } from "./../store/actions/actionTypes";
import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ASSIGNEES, LABELS } from "./../utilities/constants";
import Input from "../components/elements/input";
import Select from "../components/elements/select";

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
          message: LABELS.CREATE_TICKET_COMBINED_ERROR,
        },
      });
    } else if (!state.currentTicket.title) {
      dispatch({
        type: ticketAction.SET_ERROR_TITLE,
        payload: LABELS.NO_TITLE_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_TITLE_ERROR },
      });
    } else if (!state.currentTicket.description) {
      dispatch({
        type: ticketAction.SET_ERROR_DESCRIPTION,
        payload: LABELS.NO_DESCRIPTION_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_DESCRIPTION_ERROR },
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

      <form
        onSubmit={handleAddTicket}
        className="w-full flex flex-1 justify-center flex-col gap-6"
      >
        <Input
          htmlFor={"ticketTitle"}
          label={LABELS.TITLE}
          id={"ticketTitle"}
          error={state.error.title}
          type={"text"}
          name={"title"}
          placeholder={LABELS.TITLE_PLACEHOLDER}
          value={state.currentTicket.title}
          onChangeHandler={handleCurrentTicketTitle}
        />
        <Input
          htmlFor={"ticketDescription"}
          label={LABELS.DESCRIPTION}
          id={"ticketDescription"}
          error={state.error.description}
          type={"text"}
          name={"description"}
          placeholder={LABELS.DESCRIPTION_PLACEHOLDER}
          value={state.currentTicket.description}
          onChangeHandler={handleCurrentTicketDescription}
        />
        <Select
          htmlFor={"ticketAssignedTo"}
          label={LABELS.ASSIGNED_TO}
          id={"ticketAssignedTo"}
          error={false}
          name={"assignedTo"}
          optionsArr={ASSIGNEES}
          value={state.currentTicket.assignedTo}
          onChangeHandler={handleCurrentTicketAssignedTo}
        />

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
