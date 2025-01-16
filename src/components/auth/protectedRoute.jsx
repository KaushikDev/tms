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
  }, [loggedInUser]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
