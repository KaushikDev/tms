import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(true);

  // A hardcoded dummy user to simulate an active session
  const DUMMY_USER = {
    $id: "user-90",
    name: "Kaushik",
    email: "admin@studio.com",
    role: "admin",
  };

  useEffect(() => {
    // Check local storage on initial load to see if they "logged in" previously
    const storedSession = localStorage.getItem("tms_dummy_session");
    if (storedSession) {
      setLoggedInUser(JSON.parse(storedSession));
    }
    setLoading(false);
  }, []);

  // Simulate a network delay for realism, then log them in
  const simulateLogin = async () => {
    setLoading(true);
    setSignInError("");

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoggedInUser(DUMMY_USER);
        localStorage.setItem("tms_dummy_session", JSON.stringify(DUMMY_USER));
        setLoading(false);
        resolve();
      }, 800); // 800ms fake delay
    });
  };

  const login = async (email) => {
    // You can add fake validation here if you want it to reject wrong passwords
    if (email === "wrong@test.com") {
      setSignInError("Invalid credentials.");
      return;
    }
    await simulateLogin();
  };

  const googleLogin = async () => {
    await simulateLogin();
  };

  const logout = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoggedInUser(null);
      localStorage.removeItem("tms_dummy_session");
      setLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        signInError,
        loggedInUser,
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
