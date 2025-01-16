import { useNavigate } from "react-router-dom";
import { LABELS } from "../utilities/constants";
import { ROUTES } from "../utilities/routes";

const Home = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <div className="container flex flex-col items-center justify-center text-center mx-auto p-4 bg-white-50 min-h-[90%] max-h-[90%] overflow-y-auto">
      <h1 className="text-4xl font-bold mb-4">{LABELS.MAIN_HEADING_HOME}</h1>
      <p className="text-lg mb-6">{LABELS.SUB_HEADING_HOME}</p>
      <button
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
        onClick={handleCTAClick}
      >
        {LABELS.CREATE_NEW_TICKET}{" "}
      </button>
    </div>
  );
};

export default Home;
