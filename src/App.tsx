import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {MapComponent} from "./Components/Map/Map";

function App() {

  const itemsList = [
    { date: '2025-11-04', text: 'First log entry' },
    { date: '2025-11-05', text: 'Second log entry' },
  ];

  return (
    <div className="App">
      <Header />
      <MapComponent items={itemsList} />
    </div>
  );
}

export default App;
