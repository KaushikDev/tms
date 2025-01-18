import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ROUTES } from "../../utilities/routes";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loggedInUser ? children : navigate(ROUTES.LOGIN);
  }, [children, loggedInUser, navigate]);

  return <div className="m-0 flex flex-col flex-grow w-screen items-center justify-center overflow-y-auto">{children}</div>;
};

export default ProtectedRoute;
