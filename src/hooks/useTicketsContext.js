
import { useContext } from "react";
import { TicketsContext } from "../context/TicketsContext";

export const useTicketsContext = () => useContext(TicketsContext);