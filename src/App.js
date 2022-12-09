import { createContext, useContext, useMemo, useState } from "react";

const CounterValueContext = createContext();
const CounterActionsContext = createContext();

function CounterProvider({ children }) {
  const [counter, setCounter] = useState(1);
  const actions = useMemo(
    () => ({
      increase() {
        setCounter((prev) => prev + 1);
      },
      decrease() {
        setCounter((prev) => prev - 1);
      },
    }),
    []
  );

  return (
    <CounterActionsContext.Provider value={actions}>
      <CounterValueContext.Provider value={counter}>
        {children}
      </CounterValueContext.Provider>
    </CounterActionsContext.Provider>
  );
}

function useCounterValue() {
  const value = useContext(CounterValueContext);
  if (value === undefined) {
    throw new Error("useCounterValue should be used within CounterProvider");
  }
  return value;
}

function useCounterActions() {
  const value = useContext(CounterActionsContext);
  if (value === undefined) {
    throw new Error("useCounterActions should be used within CounterProvider");
  }
  return value;
}

function App() {
  return (
    <CounterProvider>
      <div>
        <Value />
        <Buttons />
      </div>
    </CounterProvider>
  );
}

function Value() {
  console.log("Value");
  const counter = useCounterValue();
  return <h1>{counter}</h1>;
}

function Buttons() {
  console.log("Buttons");
  const actions = useCounterActions();
  return (
    <div>
      <button onClick={actions.increase}>+</button>
      <button onClick={actions.decrease}>-</button>
    </div>
  );
}

export default App;
