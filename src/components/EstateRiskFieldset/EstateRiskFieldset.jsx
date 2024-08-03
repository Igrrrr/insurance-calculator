import { useEffect, useState } from "react";
import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { SetAlertMessage } from "../SetAlertMessage.jsx";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import styles from "./EstateRisk.module.css";

export function EstateRiskFieldset() {
  const [disabled, setDisabled] = useState(true);
  const { calcParams, setCalcParams, notifications } = useCalcParams();
  const [numberValue, setNumberValue] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    calcParams.checkedInsuranceTypes.includes("estateRisk")
      ? setDisabled(false)
      : setDisabled(true);
  }, [calcParams.checkedInsuranceTypes]);

  useEffect(() => {
    if (numberValue) {
      setCalcParams({
        ...calcParams,
        buildingYear: numberValue.getFullYear(),
        flammable: checked,
      });
    } else {
      setCalcParams({
        ...calcParams,
        buildingYear: null,
        flammable: null,
      });
    }
  }, [numberValue, checked]);

  const minDate = new Date(1800, 0, 1);
  const maxDate = new Date();

  return (
    <fieldset disabled={disabled} className={styles.wrapper}>
      <h3>Страхование имущества</h3>
      <div className={styles.estateRiskGrid}>
        <h4 className={styles.estateRiskGrid__titleBuildingYear}>
          Год постройки
        </h4>
        <Calendar
          className={styles.estateRiskGrid__inputBuildingYear}
          onChange={(e) => setNumberValue(e.value)}
          value={numberValue}
          view="year"
          dateFormat="yy"
          minDate={minDate}
          maxDate={maxDate}
        />
        <SetAlertMessage
          className={styles.estateRiskGrid__alertBuildingYear}
          paramsList={calcParams}
          param={"buildingYear"}
          missingParamsList={notifications}
          text={notifications.buildingYear}
        />
        <h4 className={styles.estateRiskGrid__titleFlammable}>
          Деревянные стены и (или) перекрытия
        </h4>
        <Checkbox
          className={styles.estateRiskGrid__inputFlammable}
          disabled={disabled}
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
        ></Checkbox>
      </div>
    </fieldset>
  );
}
