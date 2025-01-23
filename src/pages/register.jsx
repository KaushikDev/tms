import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LABELS } from "./../utilities/constants";
import AuthForm from "./../components/general/authForm";
import { ROUTES } from "../utilities/routes";
import Button from "../components/elements/button";

const Register = () => {
  const { signInError, register, googleLogin, loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [loggedInUser, navigate]);

  const handleRouteToLogin = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <div className="h-full w-full flex flex-col items-center justify-between p-4 bg-white-50 ">
      <div>
        {" "}
        <h2 className="text-4xl font-bold mb-4">{LABELS.REGISTER}</h2>
      </div>
      <AuthForm
        isLogin={false}
        loginRegular={register}
        loginGoogle={googleLogin}
        label={LABELS.REGISTER}
        signInError={signInError}
      />

      <Button
        btnSecondary
        id="didnt-login-btn"
        type="button"
        isDisabled={false}
        label={LABELS.HAVE_AN_ACCOUNT}
        onClickHandler={handleRouteToLogin}
      />
    </div>
  );
};

export default Register;
