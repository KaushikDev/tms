import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LABELS } from "./../utilities/constants";
import AuthForm from "./../components/general/authForm";
import { ROUTES } from "../utilities/routes";
import Button from "../components/elements/button";

const Login = () => {
  const { loading, signInError, login, googleLogin, loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [loggedInUser, navigate]);

  const handleRouteToRegister = () => {
    navigate(ROUTES.REGISTER);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-between p-4 bg-white-50 ">
      <div>
        {" "}
        <h2 className="text-4xl font-bold mb-4">{LABELS.LOGIN}</h2>
      </div>
      <AuthForm
        isLogin
        loginRegular={login}
        loginGoogle={googleLogin}
        label={LABELS.LOGIN}
        signInError={signInError}
        loading={loading}
      />
      <Button
        btnSecondary
        id="didnt-register-btn"
        type="button"
        isDisabled={false}
        label={LABELS.NOT_REGISTERED_YET}
        onClickHandler={handleRouteToRegister}
      />
    </div>
  );
};

export default Login;
