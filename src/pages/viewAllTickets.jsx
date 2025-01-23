import { useNavigate } from "react-router-dom";
import { useTicketsContext } from "./../hooks/useTicketsContext";
import { ticketAction } from "./../store/actions/actionTypes";
import { ASSIGNEES, LABELS } from "./../utilities/constants";
import { ROUTES } from "../utilities/routes";
import Input from "../components/elements/input";
import Select from "../components/elements/select";
import Button from "../components/elements/button";

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
        payload: { show: true, message: LABELS.TICKET_DELETED },
      });
    })();
    dispatch({
      type: ticketAction.ADD_TO_DELETE_LIST,
      payload: ticket,
    });
    navigate(ROUTES.DELETED);
  };

  const handleEditTicket = (e) => {
    e.preventDefault();
    if (
      !state.ticketToUpdate.newValue.title &&
      !state.ticketToUpdate.newValue.description
    ) {
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
    } else if (!state.ticketToUpdate.newValue.title) {
      dispatch({
        type: ticketAction.SET_ERROR_TITLE,
        payload: LABELS.NO_TITLE_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_TITLE_ERROR },
      });
    } else if (!state.ticketToUpdate.newValue.description) {
      dispatch({
        type: ticketAction.SET_ERROR_DESCRIPTION,
        payload: LABELS.NO_DESCRIPTION_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_DESCRIPTION_ERROR },
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
        payload: { show: true, message: LABELS.TICKET_UPDATED },
      });
      dispatch({ type: ticketAction.RESET_ERROR });
    }
  };

  const handleChangeUpdateTicket = (e) => {
    e.target.value && e.target.name === "title"
      ? dispatch({ type: ticketAction.SET_ERROR_TITLE, payload: "" })
      : null;
    e.target.value && e.target.name === "description"
      ? dispatch({ type: ticketAction.SET_ERROR_DESCRIPTION, payload: "" })
      : null;
    dispatch({
      type: ticketAction.TICKET_TO_UPDATE_CHANGES,
      payload: { field: [e.target.name], value: e.target.value },
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

  const handleCancelUpdate = () => {
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
              <Button
                btnDanger
                id="deleteTicket"
                type="button"
                isDisabled={false}
                label={LABELS.DELETE_THIS_TICKET}
                onClickHandler={() => handleDeleteTicket(ticket)}
              />
              <Button
                id="updateTicket"
                type="button"
                isDisabled={false}
                label={LABELS.UPDATE_THIS_TICKET}
                onClickHandler={() => handleTicketUpdate(ticket)}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleEditTicket} className="flex flex-col gap-4 p-4">
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
            <div className="flex justify-end gap-2 p-4">
              <Button
                id="changeTicket"
                type="submit"
                isDisabled={false}
                label={LABELS.ADD_THIS_TICKET}
              />

              <Button
                id="cancelUpdateTicket"
                type="button"
                isDisabled={false}
                label={LABELS.CANCEL_CHANGES}
                onClickHandler={handleCancelUpdate}
              />
            </div>
          </form>
        )}
      </div>
    ))
    .reverse();

  return (
    <div className="h-full flex flex-col items-center justify-between p-4 bg-white-50 ">
      {state.tickets.length ? (
        <>
          <div>
            {" "}
            <h2 className="text-4xl font-bold mb-4">{LABELS.ALL_TICKETS}</h2>
          </div>
          <div className="w-full flex flex-1 justify-center flex-col gap-6">
            {displayAllTickets}
          </div>
        </>
      ) : (
        <div>
          {" "}
          <h2 className="text-4xl font-bold mb-4">{LABELS.NO_TICKETS_ADDED}</h2>
        </div>
      )}
    </div>
  );
};

export default ViewAllTickets;
