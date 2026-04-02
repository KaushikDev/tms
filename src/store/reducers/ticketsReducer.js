import { ticketAction } from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";
import { currentDateAndTime, formatTextInput } from "../../utilities/utils";
import { dummyData } from "../../utilities/dummyData";

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
    case ticketAction.CURRENT_TICKET_STATUS:
      return {
        ...state,
        currentTicket: { ...state.currentTicket, status: action.payload },
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

          currentTicket: {
            title: "",
            description: "",
            assignedTo: "",
            status: "TODO",
          },
        };
      } else {
        return {
          ...state,
          tickets: [...state.tickets, { ...action.payload }],
        };
      }

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
      const updatedTickets = [...state.tickets].filter(
        (item) => item !== state.ticketToUpdate.oldValue,
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

    case ticketAction.ARCHIVE_THIS_TICKET:
      const filteredArr = [...state.tickets].filter(
        (item) => item.id !== action.payload,
      );
      return {
        ...state,
        tickets: filteredArr,
      };

    case ticketAction.REMOVE_FROM_ARCHIVED_LIST:
      const updatedArchivedList = [...state.archive].filter(
        (item) => item.id !== action.payload,
      );
      return {
        ...state,
        archive: updatedArchivedList,
      };

    case ticketAction.ADD_TO_ARCHIVE_LIST:
      return {
        ...state,
        archive: [
          ...state.archive,
          { ...action.payload, archivedOn: currentDateAndTime() },
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
    case ticketAction.SET_ERROR_NAME:
      return {
        ...state,
        error: { ...state.error, name: action.payload },
      };
    case ticketAction.SET_ERROR_EMAIL:
      return {
        ...state,
        error: { ...state.error, email: action.payload },
      };
    case ticketAction.SET_ERROR_PASSWORD:
      return {
        ...state,
        error: { ...state.error, password: action.payload },
      };
    case ticketAction.SET_ERROR_SIGNIN:
      return {
        ...state,
        error: { ...state.error, password: action.payload },
      };
    case ticketAction.RESET_ERROR:
      return {
        ...state,
        error: {
          title: "",
          description: "",
          name: "",
          email: "",
          password: "",
          signin: "",
        },
      };

    case ticketAction.IMPORT_DUMMY_DATA:
      return {
        ...state,
        ...dummyData,
        import: { ...state.import, status: true },
      };
    default:
      return state;
  }
};
