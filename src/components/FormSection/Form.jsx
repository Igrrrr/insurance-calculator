import { useRef } from "react";
import { useData } from "../../hooks/useData.jsx";
import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { TypeOfEstateFieldset } from "../TypesOfEstate/TypesOfEstateFieldset.jsx";
import { LoanParamsFieldset } from "../LoanParams/LoanParamsFieldset.jsx";
import { InsuranceTypesFieldset } from "../InsuranceTypes/InsuranceTypesFieldset.jsx";
import { LifeRiskFieldset } from "../LifeRiskFieldset/LifeRiskFieldset.jsx";
import { EstateRiskFieldset } from "../EstateRiskFieldset/EstateRiskFieldset.jsx";
import { TitleRiskFieldset } from "../TitleRiskFieldset/TitleRiskFieldset.jsx";
import { SubmitSection } from "../SubmitSection/SubmitSection.jsx";
import "./Form.scss";

export function Form() {
  const { calcParams } = useCalcParams();
  const { isError } = useData();
  const toast = useRef(null);

  return (
    <div className={`container background_${calcParams.typeOfEstate}`}>
      {isError ? (
        <div className="container_error">
          <Toast ref={toast} />
          <Message
            severity="warn"
            text="В данный момент проводятся технические работы, попробуйте позже"
          />
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} action="">
          <TypeOfEstateFieldset />
          <LoanParamsFieldset />
          <InsuranceTypesFieldset />
          <LifeRiskFieldset />
          <EstateRiskFieldset />
          <TitleRiskFieldset />
          <SubmitSection />
        </form>
      )}
    </div>
  );
}
