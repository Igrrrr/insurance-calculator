import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import styles from "./SubmitSection.module.css";

export function SubmitSection() {
  const [disabled, setDisabled] = useState(true);
  const { calcParams, setCalcParams, notifications, setNotifications } =
    useCalcParams();
  const [lifeCoefficients, setLifeCoefficients] = useState([]);
  const [estateCoefficients, setEstateCoefficients] = useState([]);
  const [titleCoefficients, setTitleCoefficients] = useState([]);
  const [coefficientsList, setCoefficientsList] = useState([]);
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const resp = await fetch("/coefficientsList.json");
    const json = await resp.json();
    setCoefficientsList(json);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const {
    selectedBankId,
    amount,
    gender,
    age,
    occupation,
    illness,
    buildingYear,
    flammable,
    durationOfOwnership,
    checkedInsuranceTypes,
    insuranceCoefficients,
  } = calcParams;

  const checkRequiredParams = (param) => {
    if (calcParams[param] || notifications.missingParamsLog.includes(param)) {
      setNotifications((prev) => ({
        ...prev,
        missingParamsLog: prev.missingParamsLog.filter((note) => note != param),
      }));
    } else {
      !notifications.missingParamsLog.includes(param) &&
        setNotifications((prev) => ({
          ...prev,
          missingParamsLog: prev.missingParamsLog.concat(param),
        }));
    }
  };

  const checkAvailibilityParams = () => {
    checkRequiredParams("amount");

    if (checkedInsuranceTypes.includes("lifeRisk")) {
      checkRequiredParams("gender");
      checkRequiredParams("age");
      checkRequiredParams("occupation");
    }
    if (checkedInsuranceTypes.includes("estateRisk")) {
      checkRequiredParams("buildingYear");
    }
    return;
  };

  useEffect(() => {
    checkedInsuranceTypes.length != 0 ? setDisabled(false) : setDisabled(true);
  }, [checkedInsuranceTypes]);

  const selectedBankCoefficients = coefficientsList.find(
    (item) => item?.bankID === selectedBankId
  );
  useEffect(() => {
    if (calcParams.checkedInsuranceTypes?.includes("lifeRisk")) {
      lifeCoefficients.length > 0 && setLifeCoefficients([]);

      if (gender && age)
        setLifeCoefficients((prev) =>
          prev.concat(selectedBankCoefficients[gender]?.[age])
        );
      if (occupation === "genderIncreased")
        setLifeCoefficients((prev) =>
          prev.concat(selectedBankCoefficients.genderIncreased)
        );
      if (illness)
        setLifeCoefficients((prev) =>
          prev.concat(selectedBankCoefficients.genderIncreased)
        );
    }
  }, [gender, age, occupation, illness]);

  useEffect(() => {
    if (calcParams.checkedInsuranceTypes?.includes("estateRisk")) {
      estateCoefficients.length > 0 && setEstateCoefficients([]);
      if (buildingYear <= 1960) {
        setEstateCoefficients((prev) =>
          prev.concat(selectedBankCoefficients?.estateBasic[1960])
        );
      } else if (buildingYear >= 1961 && buildingYear <= 2000) {
        setEstateCoefficients((prev) =>
          prev.concat(selectedBankCoefficients?.estateBasic[1961])
        );
      } else {
        setEstateCoefficients((prev) =>
          prev.concat(selectedBankCoefficients?.estateBasic[2000])
        );
      }
    }

    flammable &&
      setEstateCoefficients((prev) =>
        prev.concat(selectedBankCoefficients?.estateIncreased)
      );
  }, [buildingYear, flammable]);

  useEffect(() => {
    if (calcParams.checkedInsuranceTypes?.includes("titleRisk")) {
      titleCoefficients.length > 0 && setTitleCoefficients([]);
      setTitleCoefficients((prev) =>
        prev.concat(selectedBankCoefficients?.titleBasic)
      );
      durationOfOwnership &&
        setTitleCoefficients((prev) =>
          prev.concat(selectedBankCoefficients?.titleIncreased)
        );
    }
  }, [checkedInsuranceTypes, durationOfOwnership]);

  const setActualCoefficientsList = (coefficientsArray) => {
    setCalcParams((prev) => ({
      ...prev,
      insuranceCoefficients: [
        ...prev.insuranceCoefficients,
        ...coefficientsArray,
      ],
    }));
  };

  const isReady = (risk, ...params) => {
    return checkedInsuranceTypes.includes(risk) && params.every(Boolean);
  };

  useEffect(() => {
    setCalcParams({
      ...calcParams,
      insuranceCoefficients: [],
    });
  }, [click]);

  useEffect(() => {
    if (insuranceCoefficients.length) return;
    isReady("lifeRisk", amount, gender, age, occupation) &&
      setActualCoefficientsList(lifeCoefficients);
    isReady("estateRisk", amount, buildingYear) &&
      setActualCoefficientsList(estateCoefficients);
    isReady("titleRisk", amount) &&
      setActualCoefficientsList(titleCoefficients);
  }, [insuranceCoefficients, amount]);

  const countSum = () => {
    setClick(!click);
    checkAvailibilityParams();
  };
  console.log(insuranceCoefficients);

  const mainCoefficient = insuranceCoefficients?.reduce((acc, coefficient) => {
    acc += coefficient;
    return acc;
  }, 0);
  console.log(mainCoefficient);

  const result = (amount * (mainCoefficient / 100)).toFixed(2);
  return (
    <section className={styles.wrapper}>
      <Button disabled={disabled} label="Рассчитать" onClick={countSum} />
      <InputNumber
        inputId="currency-ru"
        value={result}
        mode="currency"
        currency="RUB"
        locale="ru-RU"
      />
    </section>
  );
}
