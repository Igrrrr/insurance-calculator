import { createContext, useContext, useState, useEffect } from "react";
import { getData } from "../components/utils.js";
const dataContext = createContext();

export const useData = () => useContext(dataContext);

export const DataProvider = ({ children }) => {
  const [banks, setBanks] = useState([]);
  const [coefficientsList, setCoefficientsList] = useState([]);
  const [isError, setIsError] = useState();
  const getBanks = async () => {
    try {
      const data = await getData("/bankList.json");
      return setBanks(data);
    } catch (error) {
      setIsError(true);
    }
  };
  const getCoefficients = async () => {
    try {
      const data = await getData("/coefficientsList.json");
      return setCoefficientsList(data);
    } catch (error) {
      setIsError(true);
    }
  };
  useEffect(() => {
    getBanks();
    getCoefficients();
  }, []);

  return (
    <dataContext.Provider value={{ banks, coefficientsList, isError }}>
      {children}
    </dataContext.Provider>
  );
};
