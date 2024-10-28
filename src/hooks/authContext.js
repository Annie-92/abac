import { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoggedInState = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, updateLoggedInState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };