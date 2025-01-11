import { Link } from "react-router-dom";
import { LuTicketsPlane } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";


const Header = () => (
  <header className="w-full text-center p-4 bg-blue-600 text-white flex flex-row items-center justify-between">
    <Link
      to="/"
      className="hover:text-gray-100 text-gray-100 transition hover:underline"
    >
      <LuTicketsPlane className="text-2xl" />
    </Link>
    <nav className="mt-0 text-center">
      <ul className="inline-flex space-x-6">
        <Link
          to="/add-ticket"
          className="hidden sm:inline-block hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          Create Ticket
        </Link>
        <Link
          to="/view-all-tickets"
          className="hidden sm:inline-block hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          View Tickets
        </Link>
        <Link
          to="/recently-deleted"
          className="hidden sm:inline-block hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          Recently Deleted
        </Link>
        {/* <Link
          to="/users"
          className="hidden sm:inline-block hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          Users{" "}
        </Link> */}
        <Link
          to="/add-ticket"
          className="sm:hidden inline-block hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          <IoIosAddCircle />
        </Link>
        <Link
          to="/view-all-tickets"
          className="sm:hidden inline-block sm:hidden inline-block  hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          <FaList />
        </Link>
        <Link
          to="/recently-deleted"
          className="sm:hidden inline-block hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          <MdDeleteForever />
        </Link>
        {/* <Link
          to="/users"
          className="sm:hidden inline-block  hover:text-gray-100 text-gray-100 transition hover:underline"
        >
          Users{" "}
        </Link> */}
      </ul>
    </nav>
  </header>
);

export default Header;
