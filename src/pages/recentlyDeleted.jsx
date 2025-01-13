
import { useTicketsContext } from "../hooks/useTicketsContext";


const RecentlyDeleted = () => {
  const { state } = useTicketsContext();

  return (
    <div className="container mx-auto p-4 bg-white-50 min-h-[90%] max-h-[90%]">
      {state.recentlyDeleted.length ? (
        <>
          <h2 className="text-center  text-xl font-semibold text-gray-800 mb-4">
            Recently Deleted Tickets
          </h2>
          <div className="p-2 max-h-full  overflow-y-auto">
            {state.recentlyDeleted.map((ticket, index) => (
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
              </div>
            )).reverse()}
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
