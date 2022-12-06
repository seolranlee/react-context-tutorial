import { createContext, useContext, useMemo, useState } from "react";
const CounterContext = createContext();

// Context 에서 유동적인 값을 관리하는 경우엔 Provider를 새로 만들어주는 것이 좋다.
function CounterProvider({ children }) {
  // 데이터를 어떻게 업데이트할 지에 대한 로직을 컴포넌트가 아닌 Provider단에서 구현
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

  const value = useMemo(() => [counter, actions], [counter, actions]);
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

// 커스텀 Hook
function useCounter() {
  const value = useContext(CounterContext);
  if (value === undefined) {
    throw new Error("useCounterState should be used within CounterProvider");
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
  const [counter] = useCounter();
  return <h1>{counter}</h1>;
}

function Buttons() {
  const [, actions] = useCounter();
  return (
    <div>
      <button onClick={actions.increase}>+</button>
      <button onClick={actions.decrease}>-</button>
    </div>
  );
}

export default App;
