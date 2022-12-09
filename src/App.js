import { createContext, useContext, useMemo, useState } from "react";

const ModalValueContext = createContext();
const ModalActionsContext = createContext();

function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    visible: false,
    message: "",
  });

  const actions = useMemo(
    () => ({
      open(message) {
        setModal({
          message,
          visible: true,
        });
      },
      close() {
        setModal((prev) => ({
          ...prev,
          visible: false,
        }));
      },
    }),
    []
  );

  return (
    <ModalActionsContext.Provider value={actions}>
      <ModalValueContext.Provider value={modal}>
        {children}
      </ModalValueContext.Provider>
    </ModalActionsContext.Provider>
  );
}

function useModalValue() {
  const value = useContext(ModalValueContext);
  if (value === undefined) {
    throw new Error("useModalValue should be used witin ModalProvider");
  }
  return value;
}

function useModalActions() {
  const value = useContext(ModalActionsContext);
  if (value === undefined) {
    throw new Error("useModalActions should be used witin ModalProvider");
  }
  return value;
}

function Value() {
  console.log("Value");
  const { visible, message } = useModalValue();
  return (
    visible && (
      <>
        <h1>Hello modal</h1>
        <p>{message}</p>
      </>
    )
  );
}

function Buttons() {
  console.log("Buttons");
  const { open, close } = useModalActions();
  return (
    <div>
      <button onClick={() => open("modal description")}>open</button>
      <button onClick={close}>close</button>
    </div>
  );
}

function App() {
  return (
    <ModalProvider>
      <div>
        <Value />
        <Buttons />
      </div>
    </ModalProvider>
  );
}

export default App;
