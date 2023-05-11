import { useState } from "react";
import "./App.css";
import FlavanoidsData from "./component/pages/FlavanoidsData";
import GammaData from "./component/pages/GammaData";

function App() {
  const [toggle, setToggle] = useState(false);

  const handleToggle =()=>{
    setToggle(!toggle)
  }
  return (
    <div className="App">
      {!toggle && <FlavanoidsData />}
      {toggle && <GammaData />}
      <button onClick={handleToggle}>{toggle? "Flavanoid":"Gamma"} Data</button>
    </div>
  );
}

export default App;
