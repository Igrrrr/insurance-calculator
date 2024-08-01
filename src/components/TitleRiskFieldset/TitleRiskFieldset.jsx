import { useState, useEffect } from "react";
import { useCalcParams } from "../../hooks/useCalcParams";
import { Checkbox } from "primereact/checkbox";
import styles from "./TitleRisk.module.css";

export function TitleRiskFieldset() {
  const [disabled, setDisabled] = useState(true);
  const { calcParams, setCalcParams } = useCalcParams();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    calcParams.checkedInsuranceTypes.includes("titleRisk")
      ? setDisabled(false)
      : setDisabled(true);
  }, [calcParams.checkedInsuranceTypes]);

  useEffect(() => {
    setCalcParams({
      ...calcParams,
      durationOfOwnership: checked,
    });
  }, [checked]);
  return (
    <fieldset disabled={disabled} className={styles.wrapper}>
      <h3>Страхование титула</h3>
      <div className={styles.titleRiskFlexbox}>
        <h4>В собственности менее трех лет</h4>
        <Checkbox
          className={styles.titleRiskFlexbox__input}
          disabled={disabled}
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
        ></Checkbox>
      </div>
    </fieldset>
  );
}
