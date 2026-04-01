import { Link } from "react-router-dom";
import { LuTicketsPlane } from "react-icons/lu";
import { ROUTES } from "../../utilities/routes";
import Menu from "./menu";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6 py-3 flex flex-row items-center justify-between">
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center gap-2 transition-opacity hover:opacity-80 font-bold text-xl group"
        >
          <LuTicketsPlane className="text-2xl text-indigo-600 dark:text-indigo-400 group-hover:-translate-y-1 transition-transform" />
          <span className="hidden sm:block tracking-tight text-gray-900 dark:text-white">
            Tickets
            <span className="text-indigo-600 dark:text-indigo-400">
              Manager
            </span>
          </span>
        </Link>

        <nav className="flex items-center">
          <ul className="flex items-center space-x-2 sm:space-x-6">
            <Menu />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
