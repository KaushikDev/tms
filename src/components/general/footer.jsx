import { Link } from "react-router-dom";
import { AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import logo from "../../assets/KaushikDev.svg";
import { LABELS } from "../../utilities/constants";


const Footer = () => (
  <footer className="w-full bg-gray-900 text-white py-8">
    <div className=" mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 gap-8 sm:flex-row">
      {/* Logo and Copyright Column */}
   
      <div className="text-sm flex flex-col sm:flex-row sm:items-start">
  <Link
    className="text-white inline-block flex items-center"
    target="_blank"
    to="https://kaushikdev.com"
  >
    &copy;
    <img
      className="h-5 sm:mx-0"
      src={logo}
      alt="KaushikDev Logo"
    />
  </Link>
  <p>{new Date().getFullYear()}. All rights reserved.</p>
</div>


      {/* Links Column */}
      <div className="flex flex-row items-center justify-end">
        {/* Icons for smaller screens */}
        <div className="flex space-x-4 text-xl sm:hidden">
          <Link
            className="text-gray-100 transition"
            target="_blank"
            to="https://github.com/KaushikDev"
          >
            <FaGithub />
          </Link>
          <Link
            className="text-gray-100 transition"
            target="_blank"
            to="https://www.linkedin.com/in/piyush-kaushik-039169321/"
          >
            <AiFillLinkedin />
          </Link>
          <Link
            className="text-gray-100 transition"
            to="mailto:piyush.kaushik02@gmail.com?subject=Saw%20your%20portfolio...&body=Hi%20Piyush%20(kaushikDev),"
          >
            <MdEmail />
          </Link>
        </div>

        {/* Links with text for larger screens */}
        <div className="hidden sm:flex flex-row space-x-4 text-sm">
          <Link
            className=" text-gray-100 transition"
            target="_blank"
            to="https://github.com/KaushikDev"
          >
            {LABELS.GITHUB}
          </Link>
          <Link
            className=" text-gray-100 transition"
            target="_blank"
            to="https://www.linkedin.com/in/piyush-kaushik-039169321/"
          >
            {LABELS.LINKEDIN}
          </Link>
          <Link
            className=" text-gray-100 transition"
            to="mailto:piyush.kaushik02@gmail.com?subject=TicketManagementSystem&body=Hi%20Piyush%20(kaushikDev),"
          >
            {LABELS.EMAIL}
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
