/* eslint-disable react/prop-types */
import { useTicketsContext } from "../hooks/useTicketsContext";

const RecentlyDeleted = ({ deletedTickets }) => {
  const { state } = useTicketsContext();

  return (
    <div className="container mx-auto p-4 bg-white-50 rounded-lg shadow-md max-h-[500px] overflow-y-auto">
      {state.recentlyDeleted.length ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recently Deleted Tickets
          </h2>
          <div className="space-y-4">
            {deletedTickets.map((ticket, index) => (
              <div
                key={index}
                className="card flex flex-col gap-4 p-4 mb-4 bg-gray-100 shadow-md rounded-lg border border-gray-200 hover:shadow-lg"
              >
                <p className="text-gray-700"><strong>ID:</strong> {ticket.id}</p>
                <p className="text-gray-700"><strong>Title:</strong> {ticket.title}</p>
                <p className="text-gray-700"><strong>Description:</strong> {ticket.description}</p>
                <p className="text-gray-700"><strong>Created On:</strong> {ticket.createdOn}</p>
                <p className="text-gray-700"><strong>Deleted On:</strong> {ticket.deletedOn}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3 className="text-lg font-medium text-gray-500 text-center">
          No Recently Deleted Tickets!
        </h3>
      )}
    </div>
  );
};

export default RecentlyDeleted;


