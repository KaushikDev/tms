import { useTicketsContext } from "../hooks/useTicketsContext";
import { LABELS } from "../utilities/constants";
import { ticketAction } from "../store/actions/actionTypes";
import { useNavigate } from "react-router-dom";

const RecentlyDeleted = () => {
  const { state, dispatch } = useTicketsContext();
  const navigate = useNavigate();

  const handleRestoreTicket = async (ticket) => {
    (async () => {
      dispatch({
        type: ticketAction.ADD_NEW_TICKET,
        payload: {
          title: ticket.title,
          description: ticket.description,
          assignedTo: ticket.assignedTo,
          id: ticket.id,
          createdOn: ticket.createdOn,
        },
      });
      dispatch({
        type: ticketAction.REMOVE_FROM_DELETED_LIST,
        payload: ticket.id,
      });
    })();
    await dispatch({
      type: ticketAction.RAISE_TOAST,
      payload: { show: true, message: "Ticket is restored!" },
    });
    navigate("/view-all-tickets");
  };

  return (
    <div className="container mx-auto p-4 bg-white-50 min-h-[90%] max-h-[90%]">
      {state.recentlyDeleted.length ? (
        <>
          <h2 className="text-center  text-xl font-semibold text-gray-800 mb-4">
            Recently Deleted Tickets
          </h2>
          <div className="p-2 max-h-full  overflow-y-auto">
            {state.recentlyDeleted
              .map((ticket, index) => (
                <div
                  key={index}
                  className="card flex flex-col gap-4 p-4 mb-4 bg-gray-100 hover:shadow-md rounded-lg border border-gray-200"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    <span className="text-gray-400 font-small">
                      [{ticket.id}]
                    </span>{" "}
                  </h2>

                  <p className="text-gray-700">
                    <strong>Title:</strong> {ticket.title}
                  </p>
                  <p className="text-gray-700">
                    <strong>Description:</strong> {ticket.description}
                  </p>
                  <p className="text-gray-700">
                    <strong>Created On:</strong> {ticket.createdOn}
                  </p>
                  <p className="text-gray-700">
                    <strong>Deleted On:</strong> {ticket.deletedOn}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleRestoreTicket(ticket)}
                      className="uppercase px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-red-600"
                    >
                      {LABELS.RESTORE_THIS_TICKET}
                    </button>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </>
      ) : (
        <h2 className="text-center  text-xl font-semibold text-gray-800 mb-4">
          No Recently Deleted Tickets!
        </h2>
      )}
    </div>
  );
};

export default RecentlyDeleted;
