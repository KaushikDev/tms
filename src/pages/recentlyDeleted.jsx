import { useTicketsContext } from "../hooks/useTicketsContext";
import { LABELS } from "../utilities/constants";
import { ticketAction } from "../store/actions/actionTypes";


const RecentlyDeleted = () => {
  const { state, dispatch } = useTicketsContext();


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
      payload: { show: true, message: LABELS.TICKET_RESTORED },
    });

  };

  return (
    <div className="h-full flex flex-col items-center justify-between p-4 bg-white-50 ">
      {state.recentlyDeleted.length ? (
        <>
            <div>
      {" "}
      <h2 className="text-4xl font-bold mb-4">{LABELS.RECENTLY_DELETED_TICKETS}</h2>
    </div>
          <div className="w-full flex flex-1 justify-center flex-col gap-6">
            {state.recentlyDeleted
              .map((ticket, index) => (
                <div
                  key={index}
                  className="card flex flex-col gap-4 p-4 mb-4 bg-gray-100 hover:shadow-md rounded-lg border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4">
                    <div className="space-y-1">
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
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleRestoreTicket(ticket)}
                        className="uppercase px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-red-600"
                      >
                        {LABELS.RESTORE_THIS_TICKET}
                      </button>
                    </div>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </>
      ) : (
        <div>
        {" "}
        <h2 className="text-4xl font-bold mb-4">{LABELS.NO_DELETED_TICKETS}</h2>
      </div>
      )}
    </div>
  );
};

export default RecentlyDeleted;
