import { createContext, useContext, useState, useEffect } from "react";
const dataContext = createContext();

export const useData = () => useContext(dataContext);

export const DataProvider = ({ children }) => {
  const [banks, setBanks] = useState([]);
  const [coefficientsList, setCoefficientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const getData = async (url, state) => {
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      state(json);
      setIsLoading(false);
    } catch (err) {
      console.error("Error >>>", err);
      setIsError(true);
    }
  };

  useEffect(() => {
    getData("/bankList.json", setBanks);
    getData("/coefficientsList.json", setCoefficientsList);
  }, []);
  return (
    <dataContext.Provider
      value={{ banks, coefficientsList, isLoading, isError }}
    >
      {children}
    </dataContext.Provider>
  );
};
