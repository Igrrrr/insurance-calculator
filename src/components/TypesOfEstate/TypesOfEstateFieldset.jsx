import { useState, useEffect } from "react";
import { inputsTypesOfEstate } from "../inputs.js";
import { useCalcParams } from "../../hooks/useCalcParams.jsx";
import { RadioButton } from "primereact/radiobutton";
import styles from "./TypesOfEstate.module.css";

export function TypeOfEstateFieldset() {
  const { calcParams, setCalcParams } = useCalcParams();
  const [selectedEstate, setSelectedEstate] = useState();
  const [urlImg, setUrlImg] = useState("rgb(255,255,255)");

  useEffect(() => {
    setCalcParams({
      ...calcParams,
      typeOfEstate: selectedEstate,
      checkedInsuranceTypes: [],
    });

    switch (selectedEstate) {
      case "buildingApartment":
        setUrlImg("./components/img/building04.jpg");
        break;
      case "apartment":
        setUrlImg("./components/img/apartment02.jpg");
        break;
      case "house":
        setUrlImg("./components/img/house04.jpg");
        break;
      case "landLot":
        setUrlImg("./components/img/landLot01.jpg");
        break;
    }
  }, [selectedEstate]);

  console.log(urlImg);
  return (
    <fieldset className={styles.wrapper}>
      <h3>Объект ипотеки</h3>
      <div className={styles.typesOfEstate__wrapper}>
        {inputsTypesOfEstate.map((estate) => (
          <div key={estate.value} className="">
            <RadioButton
              inputId={estate.value}
              name={estate.name}
              value={estate.value}
              onChange={(e) => setSelectedEstate(e.value)}
              checked={selectedEstate === estate.value}
            />
            <label
              htmlFor={estate.value}
              className={styles.typesOfEstate__label}
            >
              {estate.children}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
