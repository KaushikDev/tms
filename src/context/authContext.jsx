import { createContext, useContext, useState, useEffect } from "react";
import { account, ID } from "../lib/appwrite";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);


  useEffect(()=>{
    const currentSession = account.get();
    if(currentSession.status){
      setLoggedInUser(currentSession);
    }
  }, [])

  const register = async (name, email, password) => {
    await account.create(ID.unique(), email, password, name);
    await login(name, email, password);
  };

  const login = async (name, email, password) => {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
