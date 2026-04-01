import { Link } from "react-router-dom";
import { AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { LABELS } from "../../utilities/constants";

const Footer = () => (
  <footer className="w-full bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-300">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm flex items-center">
        <span className="font-medium text-xs">
          &copy; {new Date().getFullYear()} KaushikDevStudio. All rights
          reserved.
        </span>
      </div>
      <div className="flex flex-row items-center space-x-6 text-xl sm:text-sm">
        <Link
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
          target="_blank"
          to="https://github.com/KaushikDev"
        >
          <FaGithub className="text-xl" />
          <span className="hidden sm:inline-block">{LABELS.GITHUB}</span>
        </Link>
        <Link
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
          target="_blank"
          to="https://www.linkedin.com/in/piyush-kaushik-039169321/"
        >
          <AiFillLinkedin className="text-xl" />
          <span className="hidden sm:inline-block">{LABELS.LINKEDIN}</span>
        </Link>
        <Link
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
          to="mailto:piyush.kaushik02@gmail.com?subject=Saw%20your%20portfolio..."
        >
          <MdEmail className="text-xl" />
          <span className="hidden sm:inline-block">{LABELS.EMAIL}</span>
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
