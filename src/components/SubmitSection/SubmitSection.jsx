import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import styles from "./SubmitSection.module.css";

export function SubmitSection() {
  const [disabled, setDisabled] = useState(true);
  const {
    calcParams,
    setCalcParams,
    selectedBankCoefficients,
    notifications,
    setNotifications,
  } = useCalcParams();
  const [lifeCoefficients, setLifeCoefficients] = useState([]);
  const [estateCoefficients, setEstateCoefficients] = useState([]);
  const [titleCoefficients, setTitleCoefficients] = useState([]);
  const [click, setClick] = useState(false);

  const {
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

  useEffect(() => {
    setDisabled(!checkedInsuranceTypes.length);
  }, [checkedInsuranceTypes]);

  useEffect(() => {
    setCalcParams({
      ...calcParams,
      insuranceCoefficients: [],
    });
  }, [click]);

  useEffect(() => {
    if (
      [
        checkedInsuranceTypes?.includes("lifeRisk"),
        gender,
        age,
        occupation,
      ].every(Boolean)
    ) {
      lifeCoefficients.length > 0 && setLifeCoefficients([]);
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
    } else {
      setLifeCoefficients([]);
    }
  }, [gender, age, occupation, illness]);

  useEffect(() => {
    if (
      [
        buildingYear,
        selectedBankCoefficients,
        checkedInsuranceTypes?.includes("estateRisk"),
      ].every(Boolean)
    ) {
      estateCoefficients.length > 0 && setEstateCoefficients([]);

      const yearPeriod = Object.keys(selectedBankCoefficients?.estateBasic)
        .sort((a, b) => b - a)
        .find((el) => el <= buildingYear);
      setEstateCoefficients((prev) =>
        prev.concat(selectedBankCoefficients?.estateBasic[yearPeriod])
      );
    } else {
      setEstateCoefficients([]);
    }

    flammable &&
      setEstateCoefficients((prev) =>
        prev.concat(selectedBankCoefficients?.estateIncreased)
      );
  }, [buildingYear, flammable]);

  useEffect(() => {
    if (checkedInsuranceTypes?.includes("titleRisk")) {
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

  const checkRequiredParams = (param) => {
    if (calcParams[param]) {
      setNotifications((prev) => ({
        ...prev,
        missingParamsLog: prev.missingParamsLog.filter(
          (note) => note !== param
        ),
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

  const isReady = (risk, ...params) => {
    return checkedInsuranceTypes.includes(risk) && params.every(Boolean);
  };

  const setActualCoefficientsList = (coefficientsArray) => {
    setCalcParams((prev) => ({
      ...prev,
      insuranceCoefficients: [
        ...prev.insuranceCoefficients,
        ...coefficientsArray,
      ],
    }));
  };

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

  const mainCoefficient = insuranceCoefficients?.reduce((acc, coefficient) => {
    acc += coefficient;
    return acc;
  }, 0);

  const result = useMemo(() => {
    if (
      (checkedInsuranceTypes.includes("lifeRisk") &&
        !lifeCoefficients.length) ||
      (checkedInsuranceTypes.includes("estateRisk") &&
        !estateCoefficients.length)
    ) {
      return;
    } else {
      return (amount * (mainCoefficient / 100)).toFixed(2);
    }
  }, [mainCoefficient]);

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
