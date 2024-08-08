import { DataProvider } from "./hooks/useData.jsx";
import { CalcParamsProvider } from "./hooks/useCalcParams.jsx";
import { Form } from "./components/FormSection/Form.jsx";

function App() {
  return (
    <DataProvider>
      <CalcParamsProvider>
        <Form />
      </CalcParamsProvider>
    </DataProvider>
  );
}

export default App;
