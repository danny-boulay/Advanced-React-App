import './App.css';
import React, { useState } from "react";
import DessertsList from "./components/DessertsList";
import Header from "./components/Header";
import CryptoCurrency from "./components/CryptoCurrency";
import Money from './components/Money';
import WeekDefiler from './components/WeekDefiler';
import Newsletter from './components/Newsletter';
import withMousePosition from './components/withMousePosition';
import PanelMouseLogger from './components/PanelMouseLogger';
import PointMouseLogger from './components/PointMouseLogger';

const PanelWithMouse = withMousePosition(PanelMouseLogger);
const PointWithMouse = withMousePosition(PointMouseLogger);

document.title = "My Advanced React App"; //titre de la tab bar du navigateur

function App() {
  const [showPoint, setShowPoint] = useState(false);

  return (
    <div className="App">
      <Header/>
      <CryptoCurrency/>
      <Money/>
      <WeekDefiler/>
      <div className="panel">
        <PanelWithMouse />
        {showPoint && <PointWithMouse />}
        <button onClick={() => setShowPoint(!showPoint)}>
          {showPoint ? "Masquer le point" : "Afficher le point"}
        </button>
      </div>
      <Newsletter/>
      <DessertsList/>
    </div>
  );
}

export default App;
