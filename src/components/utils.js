import { useCalcParams } from "../hooks/useCalcParams";
const { calcParams, SetCalcParams } = useCalcParams;
// export const SetAlertMessage = ({ param }) => {
//   if (!calcParams[param] && notifications.missingParamsLog.includes(param)) {
//     return <AlertMessage messageText={notifications[param]} />;
//   }
// };

export const setCalcValue = (param, value) => {
  SetCalcParams({
    ...calcParams,
    param: value,
  });
};
