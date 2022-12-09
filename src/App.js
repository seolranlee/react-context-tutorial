const { useState } = require("react");

function Item({ active, children, onClick }) {
  const activeStyle = {
    backgroundColor: "black",
    color: "white",
  };
  const style = {
    cursor: "pointer",
    padding: "1rem",
  };
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
      <Item active={activeId === 1} onClick={() => setActiveId(1)}>
        Hello
      </Item>
      <Item active={activeId === 2} onClick={() => setActiveId(2)}>
        World
      </Item>
      <Item active={activeId === 3} onClick={() => setActiveId(3)}>
        React
      </Item>
    </div>
  );
}

export default App;
