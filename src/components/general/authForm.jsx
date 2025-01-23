/* eslint-disable react/prop-types */
import { useState } from "react";
import { LABELS } from "./../../utilities/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utilities/routes";
import { useTicketsContext } from "../../hooks/useTicketsContext";
import { ticketAction } from "../../store/actions/actionTypes";
import Input from "./../elements/input";
import Button from "../elements/button";

const AuthForm = ({
  signInError,
  isLogin,
  loginRegular,
  loginGoogle,
  label,
}) => {
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
      await loginRegular(
        userDetails.name,
        userDetails.email,
        userDetails.password
      );

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
      await loginRegular(userDetails.email, userDetails.password);
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

  const handleGoogleSignIn = () => {
    loginGoogle();
  };

  return (
    <form
      className="w-full flex flex-1 justify-center flex-col gap-6"
      onSubmit={(e) => handleFormSubmission(e)}
    >
      {!isLogin ? (
        <Input
          htmlFor={"name"}
          label={LABELS.NAME}
          id={"name"}
          error={state.error.name}
          type={"text"}
          name={"name"}
          placeholder={LABELS.NAME_PLACEHOLDER}
          value={userDetails.name}
          onChangeHandler={handleUserDetails}
        />
      ) : null}
      <Input
        htmlFor={"email"}
        label={LABELS.EMAIL}
        id={"email"}
        error={state.error.email}
        type={"email"}
        name={"email"}
        placeholder={LABELS.EMAIL_PLACEHOLDER}
        value={userDetails.email}
        onChangeHandler={handleUserDetails}
      />
      <Input
        htmlFor={"password"}
        label={LABELS.PASSWORD}
        id={"password"}
        error={state.error.password}
        type={"password"}
        name={"password"}
        placeholder={LABELS.PASSWORD_PLACEHOLDER}
        value={userDetails.password}
        onChangeHandler={handleUserDetails}
      />

      <div className="flex flex-col justify-center items-center sm:flex-row gap-4 ">
      
        <Button
          btnPrimary
          id="auth-btn-regular"
          type="submit"
          isDisabled={false}
          label={label}
          onClickHandler={handleFormSubmission}
        />
      
        <Button
          id="auth-btn-google"
          type="button"
          isDisabled={false}
          label={LABELS.GOOGLE_SIGNIN}
          onClickHandler={handleGoogleSignIn}
        />
      </div>
    </form>
  );
};

export default AuthForm;
