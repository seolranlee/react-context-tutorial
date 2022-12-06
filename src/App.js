import { createContext, useContext, useState } from "react";
const CounterContext = createContext();

// Context 에서 유동적인 값을 관리하는 경우엔 Provider를 새로 만들어주는 것이 좋다.
function CounterProvider({ children }) {
  // 하나의 상태만 있는 경우라면, useState를 사용하여 만들어진 값과 함수가 들어있는 배열을 통째로 value로 넣는다.
  const counterState = useState(1);
  return (
    <CounterContext.Provider value={counterState}>
      {children}
    </CounterContext.Provider>
  );
}

// 커스텀 Hook
function useCounterState() {
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
  const [counter] = useCounterState();
  return <h1>{counter}</h1>;
}

function Buttons() {
  const [, setCounter] = useCounterState();
  const increase = () => setCounter((prev) => prev + 1);
  const decrease = () => setCounter((prev) => prev - 1);
  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
