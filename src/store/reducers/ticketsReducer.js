import { ticketAction } from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";
import { currentDateAndTime, formatTextInput } from "../../utilities/utils";

export const ticketsReducer = (state, action) => {
  switch (action.type) {
    case ticketAction.CURRENT_TICKET_TITLE:
      return {
        ...state,
        currentTicket: {
          ...state.currentTicket,
          title: formatTextInput(action.payload),
        },
      };

    case ticketAction.CURRENT_TICKET_DESCRIPTION:
      return {
        ...state,
        currentTicket: {
          ...state.currentTicket,
          description: formatTextInput(action.payload),
        },
      };

    case ticketAction.CURRENT_TICKET_ASSIGNED_TO:
      return {
        ...state,
        currentTicket: { ...state.currentTicket, assignedTo: action.payload },
      };

    case ticketAction.ADD_NEW_TICKET:
      if (!action.payload) {
        return {
          ...state,
          tickets: [
            ...state.tickets,
            {
              ...state.currentTicket,
              id: uuidv4(),
              createdOn: currentDateAndTime(),
            },
          ],
          currentTicket: { title: "", description: "", assignedTo: "" },
        };
      } else
        return {
          ...state,
          tickets: [...state.tickets, { ...action.payload }],
        };

    case ticketAction.TICKET_TO_UPDATE:
      return {
        ...state,
        ticketToUpdate: {
          ...state.ticketToUpdate,
          ...action.payload,
        },
      };

    case ticketAction.TICKET_TO_UPDATE_CHANGES:
      return {
        ...state,
        ticketToUpdate: {
          ...state.ticketToUpdate,
          newValue: {
            ...state.ticketToUpdate.newValue,
            [action.payload.field]:
              action.payload.field !== "assignedTo"
                ? formatTextInput(action.payload.value)
                : action.payload.value,
          },
        },
      };

    case ticketAction.UPDATE_THIS_TICKET:
      // eslint-disable-next-line no-case-declarations
      const updatedTickets = [...state.tickets].filter(
        (item) => item !== state.ticketToUpdate.oldValue
      );

      return {
        ...state,
        tickets: [...updatedTickets, state.ticketToUpdate.newValue],
        ticketToUpdate: {
          inProgress: false,
          oldValue: { id: "", title: "", description: "", assignedTo: "" },
          newValue: { id: "", title: "", description: "", assignedTo: "" },
        },
      };

    case ticketAction.DELETE_THIS_TICKET:
      // eslint-disable-next-line no-case-declarations
      const filteredArr = [...state.tickets].filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        tickets: filteredArr,
      };

    case ticketAction.REMOVE_FROM_DELETED_LIST:
      // eslint-disable-next-line no-case-declarations
      const updatedDeletedList = [...state.recentlyDeleted].filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        recentlyDeleted: updatedDeletedList,
      };

      case ticketAction.ADD_TO_DELETE_LIST:
        return {
          ...state,
          recentlyDeleted: [
            ...state.recentlyDeleted,
            { ...action.payload, deletedOn: currentDateAndTime() },
          ],
        };  

    case ticketAction.RAISE_TOAST:
      return {
        ...state,
        toast: action.payload,
      };

    case ticketAction.SET_ERROR_TITLE:
      return {
        ...state,
        error: { ...state.error, title: action.payload },
      };
    case ticketAction.SET_ERROR_DESCRIPTION:
      return {
        ...state,
        error: { ...state.error, description: action.payload },
      };

    case ticketAction.RESET_ERROR:
      return {
        ...state,
        error: { title: "", description: "" },
      };
    default:
      return state;
  }
};
