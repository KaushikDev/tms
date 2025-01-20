import { createContext, useReducer } from "react";
import { ticketsReducer } from "../store/reducers/ticketsReducer";

export const TicketsContext = createContext();

// eslint-disable-next-line react/prop-types
const TicketsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketsReducer, {
    tickets: [],
    currentTicket: { title: "", description: "", assignedTo: "" },
    ticketToUpdate: {
      inProgress: false,
      oldValue: { title: "", description: "", assignedTo: "" },
      newValue: { title: "", description: "", assignedTo: "" },
    },
    toast: {
      show: false,
      message: "",
    },
    recentlyDeleted: [],
    error: {
      title: "",
      description: "",
      email: "",
      password: "",
      signin: "",
    },
    import: {
      status: false,
    }
  });

  return (
    <TicketsContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketsContext.Provider>
  );
};

export default TicketsProvider;
