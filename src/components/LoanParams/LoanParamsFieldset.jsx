import { useState, useEffect } from "react";
import { useData } from "../../hooks/useData.jsx";
import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Message } from "primereact/message";
import styles from "./LoanParams.module.css";

export function LoanParamsFieldset() {
  const [optionValue, setOptionValue] = useState(null);
  const [numberValue, setNumberValue] = useState("");
  const { calcParams, setCalcParams, notifications } = useCalcParams();
  const [amountAlert, setAmountAlert] = useState(false);
  const { banks } = useData();

  const avalibleBanks = banks.filter((el) => {
    return Object.values(el.risks).flat().includes(calcParams.typeOfEstate);
  });

  useEffect(() => {
    if (
      optionValue &&
      avalibleBanks.some((bank) => bank.id === optionValue.id)
    ) {
      setCalcParams({
        ...calcParams,
        selectedBankId: optionValue.id,
        amount: numberValue,
      });
    } else {
      setCalcParams({
        ...calcParams,
        selectedBankId: null,
      });
    }
  }, [optionValue, numberValue, calcParams.typeOfEstate]);

  useEffect(() => {
    notifications.missingParamsLog.includes("amount")
      ? setAmountAlert(true)
      : setAmountAlert(false);
  }, [notifications]);

  return (
    <fieldset className={styles.wrapper}>
      <h3>Параметры кредита</h3>
      <div className={styles.loanParams__wrapper}>
        <Dropdown
          disabled={!calcParams.typeOfEstate}
          value={optionValue}
          onChange={(e) => setOptionValue(e.value)}
          options={avalibleBanks}
          optionLabel="name"
          placeholder="--Выберите банк--"
          className={styles.loanParams__input}
          checkmark={true}
          highlightOnSelect={false}
        />
        <InputNumber
          disabled={!calcParams.typeOfEstate}
          invalid={amountAlert}
          placeholder="Укажите сумму"
          value={numberValue}
          onValueChange={(e) => setNumberValue(e.value)}
          className={styles.loanParams__input}
        />
        {amountAlert && (
          <div className={styles.loanParams__alertAmount}>
            <Message severity="error" text={notifications.amount} />
          </div>
        )}
      </div>
    </fieldset>
  );
}
