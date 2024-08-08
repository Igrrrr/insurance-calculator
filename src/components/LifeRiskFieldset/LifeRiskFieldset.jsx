import { useState, useEffect } from "react";
import { SetAlertMessage } from "../SetAlertMessage.jsx";
import { inputsLifeRiskGender, occupationsList } from "../inputs.js";
import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { useData } from "../../hooks/useData.jsx";
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import styles from "./LifeRisk.module.scss";

export function LifeRiskFieldset() {
  const [disabled, setDisabled] = useState(true);
  const [selectedGender, setSelectedGender] = useState();
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [checked, setChecked] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [ageLimitAlert, setAgeLimitAlert] = useState(false);
  const [age, setAge] = useState();
  const { calcParams, setCalcParams, notifications, setNotifications } =
    useCalcParams();
  const { coefficientsList } = useData();

  useEffect(() => {
    setDisabled(!calcParams.checkedInsuranceTypes.includes("lifeRisk"));
  }, [calcParams.checkedInsuranceTypes]);

  useEffect(() => {
    const now = new Date();
    if (
      now.getMonth() > dateOfBirth?.getMonth() ||
      (now.getMonth() === dateOfBirth?.getMonth() &&
        now.getDate() > dateOfBirth?.getDate())
    ) {
      setAge(now.getFullYear() - dateOfBirth?.getFullYear());
    } else {
      setAge(now.getFullYear() - dateOfBirth?.getFullYear() - 1);
    }

    const selectedParamsList = coefficientsList.find(
      (el) => el.bankID == calcParams.selectedBankId
    );

    [selectedGender, age].every(Boolean) &&
      setAgeLimitAlert(
        !Object.hasOwn(selectedParamsList[selectedGender.value], age)
      );
  }, [dateOfBirth]);

  useEffect(() => {
    setCalcParams({
      ...calcParams,
      gender: selectedGender?.value,
      age: age,
      occupation: selectedOccupation?.riskLevel,
      illness: checked,
    });
  }, [selectedGender, selectedOccupation, age, checked]);

  return (
    <fieldset className={styles.wrapper}>
      <h3>Страхование жизни</h3>
      <div className={styles.lifeRiskGrid}>
        <h4 className={styles.lifeRiskGrid__titleGender}>Пол</h4>
        <div className={styles.gender__wrapper}>
          {inputsLifeRiskGender.map((gender) => {
            return (
              <div key={gender.value}>
                <RadioButton
                  className={styles.lifeRiskGrid__inputGender}
                  disabled={disabled}
                  inputId={gender.value}
                  name="gender"
                  value={gender}
                  onChange={(e) => setSelectedGender(e.value)}
                  checked={selectedGender?.value === gender.value}
                />
                <label htmlFor={gender.value} className={styles.gender__label}>
                  {gender.children}
                </label>
              </div>
            );
          })}
        </div>
        <SetAlertMessage
          className={styles.lifeRiskGrid__alertGender}
          paramsList={calcParams}
          param={"gender"}
          missingParamsList={notifications}
          text={notifications.gender}
        />
        <h4 className={styles.lifeRiskGrid__titleAge}>Дата рождения</h4>
        <Calendar
          className={styles.lifeRiskGrid__inputAge}
          disabled={disabled}
          invalid={ageLimitAlert}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          dateFormat="dd.mm.yy"
          mask="99.99.9999"
          placeholder="__.__.____"
          showIcon
        />
        {ageLimitAlert && (
          <div className={styles.lifeRiskGrid__alertAge}>
            <Message
              severity="error"
              text={notifications.ageLimitNotification}
            />
          </div>
        )}
        <SetAlertMessage
          className={styles.lifeRiskGrid__alertAge}
          paramsList={calcParams}
          param={"age"}
          missingParamsList={notifications}
          text={notifications.age}
        />
        <h4 className={styles.lifeRiskGrid__titleOccupation}>Профессия</h4>
        <Dropdown
          className={styles.lifeRiskGrid__inputOccupation}
          disabled={disabled}
          value={selectedOccupation}
          onChange={(e) => setSelectedOccupation(e.value)}
          options={occupationsList}
          optionLabel="name"
          placeholder="--Выберите род занятий--"
          checkmark={true}
        />
        <SetAlertMessage
          className={styles.lifeRiskGrid__alertOccupation}
          paramsList={calcParams}
          param={"occupation"}
          missingParamsList={notifications}
          text={notifications.occupation}
        />
        <h4 className={styles.lifeRiskGrid__titleIllness}>
          Хроническое
          <br />
          заболевание
        </h4>
        <div className={styles.lifeRiskGrid__inputIllness}>
          <Checkbox
            disabled={disabled}
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          ></Checkbox>
        </div>
      </div>
    </fieldset>
  );
}
