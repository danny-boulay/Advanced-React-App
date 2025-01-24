import logo from './logo.svg';
import './App.css';
import React from "react";
import DessertsList from "./components/DessertsList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to React</h1>
      </header>
      <div >
        <DessertsList/>
      </div>
    </div>
  );
}

export default App;
