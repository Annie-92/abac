// createContext.js
import { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({});

  const fetchGlobalData = async () => {
    const response = await fetch('http://localhost:8888/abac/webAPI/v1/GetQuizRules.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level }),
    });
    const data = await response.json();
    setGlobalData(data);
  };

  return (
    <GlobalContext.Provider value={{ globalData, fetchGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };