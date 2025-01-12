
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/add-ticket');
  };

  return (
    <div className="container flex flex-col items-center justify-center text-center mx-auto p-4 bg-white-50 min-h-[90%] max-h-[90%] overflow-y-auto">

      <h1 className="text-4xl font-bold mb-4">Welcome to Ticketing Management System</h1>
      <p className="text-lg mb-6">
        Manage your tickets seamlessly. Click below to get started by adding a new ticket.
      </p>
      <button
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
        onClick={handleCTAClick}
      >
        CREATE NEW TICKET
      </button>
    </div>
  );
};

export default Home;
