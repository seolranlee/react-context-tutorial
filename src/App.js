const { useState, createContext, useMemo, useContext } = require("react");

const ItemGroupContext = createContext();

function ItemGroup({ children, activeId, onSelect }) {
  const value = useMemo(
    () => ({
      activeId,
      onSelect,
    }),
    [activeId, onSelect]
  );
  return (
    <ItemGroupContext.Provider value={value}>
      {children}
    </ItemGroupContext.Provider>
  );
}
function useItemGroup() {
  const value = useContext(ItemGroupContext);
  if (value === undefined) {
    throw new Error("Item component should be used within ItemGroup");
  }
  return value;
}
function Item({ children, id }) {
  const activeStyle = {
    backgroundColor: "black",
    color: "white",
  };
  const style = {
    cursor: "pointer",
    padding: "1rem",
  };
  const { activeId, onSelect } = useItemGroup();
  const active = activeId === id;
  const onClick = () => onSelect(id);
  return (
    <div
      style={active ? { ...style, ...activeStyle } : style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeId, setActiveId] = useState(1);
  const [anotherActiveId, setAnotherActiveId] = useState(102);

  return (
    <div>
      <ItemGroup activeId={activeId} onSelect={setActiveId}>
        <Item id={1}>Hello</Item>
        <Item id={2}>World</Item>
        <Item id={3}>React</Item>
      </ItemGroup>
      <ItemGroup activeId={anotherActiveId} onSelect={setAnotherActiveId}>
        <Item id={101}>Bye</Item>
        <Item id={102}>World</Item>
        <Item id={103}>Context</Item>
      </ItemGroup>
    </div>
  );
}

export default App;
