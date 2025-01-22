import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS } from "../utilities/constants";
import { ROUTES } from "../utilities/routes";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { googleLogin, loggedInUser}  = useAuth()
  const navigate = useNavigate();

  const handleRegularSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleGoogleSignIn = () => {
    googleLogin();
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
        <button
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
          onClick={handleRegularSignIn}
        >
          {LABELS.GET_STARTED}{" "}
        </button>
        <button
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-xl"
          onClick={handleGoogleSignIn}
        >
          {LABELS.GOOGLE_SIGNIN}{" "}
        </button>
      </div>
    
    </div>
  );
};

export default Home;
