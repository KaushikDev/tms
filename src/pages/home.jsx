import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS } from "../utilities/constants";
import { ROUTES } from "../utilities/routes";
import { useAuth } from "../context/authContext";
import Button from "../components/elements/button";

const Home = () => {
  const { loading, googleLogin, loggedInUser}  = useAuth()
  const navigate = useNavigate();

  const handleRegularSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleGoogleSignIn = async () => {
    await googleLogin();
  };
  
  useEffect(()=>{
    if(loggedInUser){
      navigate(ROUTES.DASHBOARD)
    }
  }, [loggedInUser, navigate])

  return (
    <div className="container flex flex-col items-center justify-center text-center mx-auto p-4 bg-white-50 ">
      <h1 className="text-4xl font-bold mb-4">{LABELS.MAIN_HEADING_HOME}</h1>
      <p className="text-lg mb-6">{LABELS.SUB_HEADING_HOME}</p>
      <div className="flex flex-col sm:flex-row gap-4 ">
        
        <Button
          id="get-started-btn"
          type="button"
          isDisabled={loading}
          label={LABELS.GET_STARTED}
          onClickHandler={handleRegularSignIn}
        />
   
        <Button
          id="google-signin-btn"
          type="button"
          label={LABELS.GOOGLE_SIGNIN}
          onClickHandler={handleGoogleSignIn}
          isDisabled={loading}
        />
      </div>
    
    </div>
  );
};

export default Home;
