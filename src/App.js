import logo from './logo.svg';
import './App.css';
import React from "react";
import DessertsList from "./components/DessertsList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <h1>Low Calorie Desserts</h1>
        <DessertsList/>
      </div>
    </div>
  );
}

export default App;
