import { useEffect } from "react";
import { useTicketsContext } from "../../hooks/useTicketsContext";
import { ticketAction } from "../../store/actions/actionTypes";

// eslint-disable-next-line react/prop-types
const Toast = ({ message }) => {
  const { dispatch } = useTicketsContext();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: false, message: "" },
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="fixed top-24 right-1/2 transform translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg opacity-90 z-50">
      {message}
    </div>
  );
};

export default Toast;
