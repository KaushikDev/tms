import { createContext, useContext, useState, useEffect } from "react";
import { account, ID, OAuthProvider } from "../lib/appwrite";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);

  const getCurrentUserSession = async () => {
    try {
      setLoggedInUser(await account.get());
    } catch (err) {
      setSignInError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getCurrentUserSession();
    })();
  }, []);
  console.log("Logged-in user is : ", loggedInUser);
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      await login(name, email, password);
    } catch (err) {
      setSignInError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      await getCurrentUserSession();
    } catch (err) {
      setSignInError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        "https://tms.kaushikdev.com"
      );
      await getCurrentUserSession();
    } catch (err) {
      setSignInError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
    } catch (err) {
      setSignInError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(signInError);

  return (
    <AuthContext.Provider
      value={{
        loading,
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
