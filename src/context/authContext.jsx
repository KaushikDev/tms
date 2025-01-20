import { createContext, useContext, useState, useEffect } from "react";
import { account, ID } from "../lib/appwrite";

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
    await account
      .create(ID.unique(), email, password, name)
      .catch((err) => setSignInError(err.message));
    await login(name, email, password).catch((err) => setSignInError(err.message));
  };

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password).catch(err =>  setSignInError(err.message));
    setLoggedInUser(await account.get());
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };
  console.log(signInError);
  return (
    <AuthContext.Provider value={{ signInError, loggedInUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
