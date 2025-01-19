import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LABELS } from "./../utilities/constants";
import AuthForm from "./../components/general/authForm";
import { ROUTES } from "../utilities/routes";

const Register = () => {
  const { register, loggedInUser } = useAuth();
  const navigate = useNavigate();

    useEffect(()=>{
      if(loggedInUser){
        navigate(ROUTES.DASHBOARD)
      }
    }, [loggedInUser, navigate])

  return (
    <>
      <AuthForm
        isLogin={false}
        action={register}
        label={LABELS.REGISTER}
        route="/login"
      />
      <button className="mt-4" onClick={() => navigate(ROUTES.LOGIN)}>
        {LABELS.HAVE_AN_ACCOUNT}
      </button>
    </>
  );
};

export default Register;
