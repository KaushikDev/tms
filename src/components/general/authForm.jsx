import { useState } from "react";
import { LABELS } from "./../../utilities/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utilities/routes";
import { useTicketsContext } from "../../hooks/useTicketsContext";
import { ticketAction } from "../../store/actions/actionTypes";

// eslint-disable-next-line react/prop-types
const AuthForm = ({ signInError, isLogin, action, label }) => {
  const { state, dispatch } = useTicketsContext();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleUserDetails = (e) => {
    if (e.target.value) {
      if (e.target.name === "name") {
        dispatch({ type: ticketAction.SET_ERROR_NAME, payload: "" });
      }
      if (e.target.name === "email") {
        dispatch({ type: ticketAction.SET_ERROR_EMAIL, payload: "" });
      }
      if (e.target.name === "password") {
        dispatch({ type: ticketAction.SET_ERROR_PASSWORD, payload: "" });
      }
    }

    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (
      !isLogin &&
      !userDetails.name &&
      !userDetails.email &&
      !userDetails.password
    ) {
      dispatch({
        type: ticketAction.SET_ERROR_NAME,
        payload: LABELS.NO_NAME_ERROR,
      });
      dispatch({
        type: ticketAction.SET_ERROR_EMAIL,
        payload: LABELS.NO_EMAIL_ERROR,
      });
      dispatch({
        type: ticketAction.SET_ERROR_PASSWORD,
        payload: LABELS.NO_PASSWORD_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: {
          show: true,
          message: LABELS.REGISTRATION_COMBINED_ERROR,
        },
      });
    } else if (!isLogin && !userDetails.name && !userDetails.email) {
      dispatch({
        type: ticketAction.SET_ERROR_NAME,
        payload: LABELS.NO_NAME_ERROR,
      });
      dispatch({
        type: ticketAction.SET_ERROR_EMAIL,
        payload: LABELS.NO_EMAIL_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_NAME_EMAIL_ERROR },
      });
    } else if (!isLogin && !userDetails.name && !userDetails.password) {
      dispatch({
        type: ticketAction.SET_ERROR_NAME,
        payload: LABELS.NO_NAME_ERROR,
      });
      dispatch({
        type: ticketAction.SET_ERROR_PASSWORD,
        payload: LABELS.NO_PASSWORD_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_NAME_PASSWORD_ERROR },
      });
    } else if (!userDetails.email && !userDetails.password) {
      dispatch({
        type: ticketAction.SET_ERROR_EMAIL,
        payload: LABELS.NO_EMAIL_ERROR,
      });
      dispatch({
        type: ticketAction.SET_ERROR_PASSWORD,
        payload: LABELS.NO_PASSWORD_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.LOGIN_COMBINED_ERROR },
      });
    } else if (!isLogin && !userDetails.name) {
      dispatch({
        type: ticketAction.SET_ERROR_NAME,
        payload: LABELS.NO_NAME_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_EMAIL_ERROR },
      });
    } else if (!userDetails.email) {
      dispatch({
        type: ticketAction.SET_ERROR_EMAIL,
        payload: LABELS.NO_EMAIL_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_EMAIL_ERROR },
      });
    } else if (!userDetails.password) {
      dispatch({
        type: ticketAction.SET_ERROR_PASSWORD,
        payload: LABELS.NO_PASSWORD_ERROR,
      });
      dispatch({
        type: ticketAction.RAISE_TOAST,
        payload: { show: true, message: LABELS.NO_PASSWORD_ERROR },
      });
    } else if (
      !isLogin &&
      !state.error.name &&
      !state.error.email &&
      !state.error.password
    ) {
      await action(userDetails.name, userDetails.email, userDetails.password);

      if (signInError) {
        (async () => {
          dispatch({
            type: ticketAction.SET_ERROR_SIGNIN,
            payload: signInError,
          });
          dispatch({
            type: ticketAction.RAISE_TOAST,
            payload: { show: true, message: signInError },
          });
        })();
      } else {
        dispatch({ type: ticketAction.RESET_ERROR });
        navigate(ROUTES.DASHBOARD);
      }
    } else if (isLogin && !state.error.email && !state.error.password) {
      await action(userDetails.email, userDetails.password);
      if (signInError) {
        (async () => {
          dispatch({
            type: ticketAction.SET_ERROR_SIGNIN,
            payload: signInError,
          });
          dispatch({
            type: ticketAction.RAISE_TOAST,
            payload: { show: true, message: signInError },
          });
        })();
      } else {
        dispatch({ type: ticketAction.RESET_ERROR });
        navigate(ROUTES.DASHBOARD);
      }
    }
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
              state.error.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            type="text"
            name="name"
            placeholder={LABELS.NAME_PLACEHOLDER}
            value={userDetails.name}
            onChange={handleUserDetails}
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
            state.error.email ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          id="email"
          type="email"
          name="email"
          placeholder={LABELS.EMAIL_PLACEHOLDER}
          value={userDetails.email}
          onChange={handleUserDetails}
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
            state.error.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          id="password"
          type="password"
          name="password"
          placeholder={LABELS.PASSWORD_PLACEHOLDER}
          value={userDetails.password}
          onChange={handleUserDetails}
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
