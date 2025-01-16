
import { Link } from "react-router-dom";
import { ROUTES } from "../utilities/routes";
import { LABELS } from "../utilities/constants";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
       {LABELS.PAGE_NOT_FOUND}
      </p>
      <Link
        to={ROUTES.HOME}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
       {LABELS.GO_BACK_HOME}
      </Link>
    </div>
  );
};

export default NotFound;

