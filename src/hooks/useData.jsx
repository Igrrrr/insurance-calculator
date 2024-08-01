import { createContext, useContext, useState, useEffect } from "react";
const dataContext = createContext();

export const useData = () => useContext(dataContext);

export const DataProvider = ({ children }) => {
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    const resp = await fetch("/bankList.json");
    const json = await resp.json();
    setBanks(json);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <dataContext.Provider value={{ banks, isLoading }}>
      {children}
    </dataContext.Provider>
  );
};
