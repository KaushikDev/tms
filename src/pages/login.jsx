import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LABELS } from "./../utilities/constants";
import AuthForm from "./../components/general/authForm";
import { ROUTES } from "../utilities/routes";

const Login = () => {
  const { signInError, login, loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(loggedInUser){
      navigate(ROUTES.DASHBOARD)
    }
  }, [loggedInUser, navigate])

  return (
    <div className="h-full w-full flex flex-col items-center justify-between p-4 bg-white-50 ">
    <div>
      {" "}
      <h2 className="text-4xl font-bold mb-4">{LABELS.LOGIN}</h2>
    </div>
      <AuthForm isLogin action={login} label={LABELS.LOGIN} signInError={signInError}/>
      <button className="mt-4" onClick={() => navigate(ROUTES.REGISTER)}>
        {LABELS.NOT_REGISTERED_YET}
      </button>
    </div>
  );
};

export default Login;
