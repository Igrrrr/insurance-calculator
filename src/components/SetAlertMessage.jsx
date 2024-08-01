import { Message } from "primereact/message";

export const SetAlertMessage = ({
  paramsList,
  param,
  missingParamsList,
  className,
  text,
}) => {
  if (
    !paramsList[param] &&
    missingParamsList.missingParamsLog.includes(param)
  ) {
    return (
      <div disabled className={className}>
        <Message disabled severity="error" text={text} />
      </div>
    );
  } else {
    return;
  }
};
