import { createContext, useContext, useState, useEffect } from "react";
import { account, ID, OAuthProvider } from "../lib/appwrite";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [signInError, setSignInError] = useState("");

  useEffect(() => {
    const getCurrentSession = async () => {
      const currentSession = await account.get();
      if (currentSession.status) {
        setLoggedInUser(currentSession);
      }
    };
    getCurrentSession();
  }, []);

  const register = async (name, email, password) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(name, email, password);
    } catch (err) {
      setSignInError(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
    } catch (err) {
      setSignInError(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      await account.createOAuth2Session(OAuthProvider.google);
      setLoggedInUser(await account.get());
    } catch (err) {
      setSignInError(err.message);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
    } catch (err) {
      setSignInError(err.message);
    }
  };

  console.log(signInError);

  return (
    <AuthContext.Provider
      value={{
        signInError,
        loggedInUser,
        register,
        login,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
