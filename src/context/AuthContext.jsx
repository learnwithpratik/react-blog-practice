import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(() => {
    const data = localStorage.getItem("registeredUser");
    return data ? JSON.parse(data) : [];
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const data = localStorage.getItem("loggedInUser");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
  }, [registeredUser]);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <Auth.Provider
      value={{
        registeredUser,
        setRegisteredUser,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);