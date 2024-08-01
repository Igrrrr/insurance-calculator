import { useMemo } from "react";
import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { useData } from "../../hooks/useData.jsx";
import { Checkbox } from "primereact/checkbox";
import { inputsInsuranceTypes, inputsTypesOfEstate } from "../inputs.js";
import styles from "./InsuranceTypes.module.css";

export function InsuranceTypesFieldset() {
  const { calcParams, setCalcParams } = useCalcParams([]);
  const { banks } = useData();
  const { checkedInsuranceTypes } = calcParams;

  const actualInputs = useMemo(() => {
    const availableBank = banks.find(
      (bank) => bank.id === calcParams.selectedBankId
    );
    const availableEstate = inputsTypesOfEstate.find(
      (estate) => estate.value === calcParams.typeOfEstate
    );
    const actualRisks = availableEstate?.risks.filter((risk) => {
      return availableBank && Object.hasOwn(availableBank.risks, risk);
    });

    return inputsInsuranceTypes.filter(
      (el) => actualRisks?.indexOf(el.value) > -1
    );
  }, [calcParams.selectedBankId, calcParams.typeOfEstate]);

  const onInsuranceTypesChange = (e) => {
    if (e.checked) {
      setCalcParams({
        ...calcParams,
        checkedInsuranceTypes: checkedInsuranceTypes.concat(e.value),
      });
    } else {
      setCalcParams({
        ...calcParams,
        checkedInsuranceTypes: checkedInsuranceTypes.filter(
          (risk) => risk != e.value
        ),
      });
    }
  };
  return (
    <fieldset className={styles.wrapper}>
      <h3>Что необходимо страховать?</h3>
      <div className={styles.insuranceTypes__wrapper}>
        {actualInputs.map((checkbox) => {
          return (
            <div key={checkbox.name}>
              <Checkbox
                inputId={checkbox.name}
                name={checkbox.name}
                value={checkbox.value}
                onChange={onInsuranceTypesChange}
                checked={checkedInsuranceTypes.includes(checkbox.value)}
              />
              <label className={styles.insuranceTypes__label}>
                {checkbox.children}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
