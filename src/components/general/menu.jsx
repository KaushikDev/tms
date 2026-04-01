import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../utilities/routes";
import { FaList } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

const Menu = () => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MENU_ITEMS = [
    { name: "Dashboard", path: ROUTES.DASHBOARD, icon: <MdDashboard /> },
    { name: "New Issue", path: ROUTES.CREATE, icon: <IoIosAddCircle /> },
    { name: "All Issues", path: ROUTES.VIEW, icon: <FaList /> },
    { name: "Archive", path: ROUTES.DELETED, icon: <MdDeleteForever /> },
  ];

  const menu = MENU_ITEMS.map((item, index) =>
    !isSmallScreen ? (
      <Link
        key={index}
        to={item.path}
        className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
          location.pathname === item.path
            ? "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/30"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/50"
        }`}
      >
        {item.name}
      </Link>
    ) : (
      <Link
        key={index}
        to={item.path}
        className={`text-xl p-2 rounded-lg transition-colors ${
          location.pathname === item.path
            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
        }`}
      >
        {item.icon}
      </Link>
    ),
  );

  return <>{menu}</>;
};

export default Menu;
