import { createContext, useContext, useEffect, useState } from "react";

const calcParamsContext = createContext();

export const useCalcParams = () => useContext(calcParamsContext);

export const CalcParamsProvider = ({ children }) => {
  const [calcParams, setCalcParams] = useState({
    amount: null,
    typeOfEstate: null,
    selectedBankId: null,
    gender: null,
    age: null,
    occupation: null,
    illness: null,
    buildingYear: null,
    flammable: null,
    durationOfOwnership: null,
    checkedInsuranceTypes: [],
    insuranceCoefficients: [],
  });

  const [notifications, setNotifications] = useState({
    missingParamsLog: [],
    ageLimitNotification: "Вам должно быть от 18 до 74 лет",
    tooEarlyBuildingYear:
      "К страхованию принимается объект не ранее 1800 года постройки",
    incorrectBuildYear: "Укажите корректный год постройки",
    amount: "Укажите сумму",
    gender: "Укажите пол",
    age: "Укажите возраст     ",
    occupation: "Укажите профессию",
    buildingYear: "Укажите год постройки",
  });
  return (
    <calcParamsContext.Provider
      value={{ calcParams, setCalcParams, notifications, setNotifications }}
    >
      {children}
    </calcParamsContext.Provider>
  );
};
