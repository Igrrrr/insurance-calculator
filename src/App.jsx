import "./App.css";
import { useState } from "react";
import { TypeOfEstateFieldset } from "./components/TypesOfEstate/TypesOfEstateFieldset.jsx";
import { LoanParamsFieldset } from "./components/LoanParams/LoanParamsFieldset.jsx";
import { InsuranceTypesFieldset } from "./components/InsuranceTypes/InsuranceTypesFieldset.jsx";
import { LifeRiskFieldset } from "./components/LifeRiskFieldset/LifeRiskFieldset.jsx";
import { EstateRiskFieldset } from "./components/EstateRiskFieldset/EstateRiskFieldset.jsx";
import { TitleRiskFieldset } from "./components/TitleRiskFieldset/TitleRiskFieldset.jsx";
import { SubmitSection } from "./components/SubmitSection/SubmitSection.jsx";
import { DataProvider } from "./hooks/useData.jsx";
import { CalcParamsProvider } from "./hooks/useCalcParams.jsx";

function App() {
  const [active, setActive] = useState(false);
  return (
    <DataProvider>
      <CalcParamsProvider active={active}>
        <div className="container">
          <form onSubmit={(e) => e.preventDefault()} action="">
            <TypeOfEstateFieldset />
            <LoanParamsFieldset />
            <InsuranceTypesFieldset />
            <LifeRiskFieldset />
            <EstateRiskFieldset />
            <TitleRiskFieldset />
            <SubmitSection />
          </form>
        </div>
      </CalcParamsProvider>
    </DataProvider>
  );
}

export default App;
