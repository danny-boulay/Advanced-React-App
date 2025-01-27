import './App.css';
import React from "react";
import DessertsList from "./components/DessertsList";
import Header from "./components/Header";
import CryptoCurrency from "./components/CryptoCurrency";

document.title = "My Advanced React App"; //titre de la tab bar du navigateur

function App() {
  return (
    <div className="App">
      <Header/>
      <CryptoCurrency/>
      <DessertsList/>
    </div>
  );
}

export default App;
