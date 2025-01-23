import { Link, useLocation } from "react-router-dom";
import { LuTicketsPlane } from "react-icons/lu";

import { LABELS } from "../../utilities/constants";
import { useAuth } from "../../context/authContext";
import { ROUTES } from "../../utilities/routes";
import Menu from "./menu";
import { MdLogin } from "react-icons/md";

import { IoHome } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";

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
            <Menu action={logout} />
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
            <Link
              to={ROUTES.HOME}
              className={`text-xl sm:hidden inline-block p-1 text-gray-100 hover:text-gray-100 ${
                location.pathname === ROUTES.HOME
                  ? "border border-gray-100 rounded-md"
                  : null
              } hover:border  hover:border-gray-100 hover:rounded-md hover:p-1  transition`}
            >
              <IoHome />
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className={`text-xl sm:hidden inline-block p-1 text-gray-100 hover:text-gray-100 ${
                location.pathname === ROUTES.REGISTER
                  ? "border border-gray-100 rounded-md"
                  : null
              } hover:border  hover:border-gray-100 hover:rounded-md hover:p-1  transition`}
            >
              <FaUserPlus />
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className={`text-xl sm:hidden inline-block p-1 text-gray-100 hover:text-gray-100 ${
                location.pathname === ROUTES.LOGIN
                  ? "border border-gray-100 rounded-md"
                  : null
              } hover:border  hover:border-gray-100 hover:rounded-md hover:p-1  transition`}
            >
              <MdLogin />
            </Link>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
