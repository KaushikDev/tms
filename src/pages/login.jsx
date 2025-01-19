import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LABELS } from "./../utilities/constants";
import AuthForm from "./../components/general/authForm";
import { ROUTES } from "../utilities/routes";

const Login = () => {
  const { login, loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(loggedInUser){
      navigate(ROUTES.DASHBOARD)
    }
  }, [loggedInUser, navigate])

  return (
    <>
      <AuthForm isLogin action={login} label={LABELS.LOGIN} />
      <button className="mt-4" onClick={() => navigate(ROUTES.REGISTER)}>
        {LABELS.NOT_REGISTERED_YET}
      </button>
    </>
  );
};

export default Login;
