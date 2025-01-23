import { LABELS } from "../../utilities/constants";
import { Link, useLocation } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { ROUTES } from "../../utilities/routes";
import { FaList } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import Button from "../elements/button";

// eslint-disable-next-line react/prop-types
const Menu = ({ isMobile, action }) => {
  const location = useLocation();

  const MENU_ITEMS = [
    { name: LABELS.DASHBOARD, path: ROUTES.DASHBOARD, icon: <MdDashboard /> },
    { name: LABELS.CREATE, path: ROUTES.CREATE, icon: <IoIosAddCircle /> },
    { name: LABELS.VIEW, path: ROUTES.VIEW, icon: <FaList /> },
    { name: LABELS.DELETED, path: ROUTES.DELETED, icon: <MdDeleteForever /> },
  ];

  const menu = MENU_ITEMS.map((item, index) =>
    !isMobile ? (
      <Link
        key={index}
        to={item.path}
        className={`hidden sm:inline-block hover:text-gray-100 text-gray-100 transition ${
          location.pathname === item.path
            ? "underline underline-offset-4 "
            : null
        } hover:underline hover:underline-offset-4`}
      >
        {item.name}
      </Link>
    ) : (
      <Link
        key={index}
        to={item.path}
        className={`text-xl sm:hidden inline-block p-1 text-gray-100 hover:text-gray-100 ${
          location.pathname === item.path
            ? "border border-gray-100 rounded-md"
            : null
        } hover:border  hover:border-gray-100 hover:rounded-md hover:p-1  transition`}
      >
        {item.icon}
      </Link>
    )
  );

  return (
    <>
      {menu}
      {!isMobile ? (
        <Button
          btnSpecial
          id="logout-btn"
          type="button"
          isDisabled={false}
          label={LABELS.LOGOUT}
          onClickHandler={action}
        />
      ) : (
        <Button
          btnSpecial
          id="logout-btn-icon"
          type="button"
          isDisabled={false}
          label={<IoLogOut />}
          onClickHandler={action}
          isMobile
        />
      )}
    </>
  );
};

export default Menu;
