import { useState } from "react";
import { LABELS } from "./../../utilities/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utilities/routes";

// eslint-disable-next-line react/prop-types
const AuthForm = ({ isLogin, action, label }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleUserDetails = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    await action(userDetails.name, userDetails.email, userDetails.password);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <form
      className="w-full flex flex-1 justify-center flex-col gap-6"
      onSubmit={(e) => handleFormSubmission(e)}
    >
      {!isLogin ? (
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {LABELS.NAME}
          </label>
          <input
            id="name"
            className={`w-full p-3 border ${
              // eslint-disable-next-line no-constant-condition
              false ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            type="text"
            name="name"
            placeholder={LABELS.NAME_PLACEHOLDER}
            value={userDetails.name}
            onChange={(e) => handleUserDetails(e)}
          />
        </div>
      ) : null}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {LABELS.EMAIL}
        </label>
        <input
          className={`w-full p-3 border ${
            // eslint-disable-next-line no-constant-condition
            false ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          id="email"
          type="email"
          name="email"
          placeholder={LABELS.EMAIL_PLACEHOLDER}
          value={userDetails.email}
          onChange={(e) => handleUserDetails(e)}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {" "}
          {LABELS.PASSWORD}
        </label>
        <input
          className={`w-full p-3 border ${
            // eslint-disable-next-line no-constant-condition
            false ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          id="password"
          type="password"
          name="password"
          placeholder={LABELS.PASSWORD_PLACEHOLDER}
          value={userDetails.password}
          onChange={(e) => handleUserDetails(e)}
        />
      </div>

      <div>
        <button
          className="uppercase w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
          type="submit"
          onClick={(e) => handleFormSubmission(e)}
        >
          {label}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
