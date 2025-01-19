import { Link, useLocation } from "react-router-dom";
import { LuTicketsPlane } from "react-icons/lu";

import { LABELS } from "../../utilities/constants";
import { useAuth } from "../../context/authContext";
import { ROUTES } from "../../utilities/routes";
import Menu from "./menu";

const Header = () => {
  const { loggedInUser, logout } = useAuth();
  const location = useLocation();

  return (
    <header className=" fixed top-0 left-0 z-10 w-full text-center p-2 bg-blue-600 text-white flex flex-row items-center justify-between">
      <Link
        to={ROUTES.HOME}
        className="hover:text-gray-900 text-gray-100 transition"
      >
        <LuTicketsPlane className="sm:text-4xl text-2xl" />
      </Link>

      <nav className="flex flex-col items-center  mt-0 text-center">
        {loggedInUser ? (
          <ul className="inline-flex space-x-6 items-center">
            <Menu isMobile={false} action={logout} />

            <Menu isMobile={true} action={logout} />
          </ul>
        ) : (
          <ul className="inline-flex space-x-6 items-center">
            <Link
              to={ROUTES.HOME}
              className={`hidden sm:inline-block hover:text-gray-100 text-gray-100 transition ${
                location.pathname === ROUTES.HOME
                  ? "underline underline-offset-4 "
                  : null
              } hover:underline hover:underline-offset-4`}
            >
              {LABELS.HOME}
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className={`hidden sm:inline-block hover:text-gray-100 text-gray-100 transition ${
                location.pathname === ROUTES.REGISTER
                  ? "underline underline-offset-4 "
                  : null
              } hover:underline hover:underline-offset-4`}
            >
              {LABELS.REGISTER}
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className={`hidden sm:inline-block hover:text-gray-100 text-gray-100 transition ${
                location.pathname === ROUTES.LOGIN
                  ? "underline underline-offset-4 "
                  : null
              } hover:underline hover:underline-offset-4`}
            >
              {LABELS.LOGIN}
            </Link>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
