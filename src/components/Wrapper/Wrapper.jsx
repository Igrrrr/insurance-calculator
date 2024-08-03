import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import "./Wrapper.css";

export function Wrapper({ children }) {
  const { calcParams } = useCalcParams();

  return (
    <div className={`container background_${calcParams.typeOfEstate}`}>
      {children}
    </div>
  );
}
