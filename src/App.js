const { useState } = require("react");

function Item({ id, activeId, onSelect, children }) {
  const activeStyle = {
    backgroundColor: "black",
    color: "white",
  };
  const style = {
    cursor: "pointer",
    padding: "1rem",
  };
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
  return (
    <div>
      <Item id={1} activeId={activeId} onSelect={setActiveId}>
        Hello
      </Item>
      <Item id={2} activeId={activeId} onSelect={setActiveId}>
        World
      </Item>
      <Item id={3} activeId={activeId} onSelect={setActiveId}>
        React
      </Item>
    </div>
  );
}

export default App;
