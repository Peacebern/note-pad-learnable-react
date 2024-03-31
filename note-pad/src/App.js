// App.js
import React from 'react';
import NotePad from './components/NotePad'; 
import './App.css'; // Import styles

function App() {
  return (
    <div className="App">
      <h1>Simple Notepad App</h1>
      <NotePad />
    </div>
  );
}

export default App;
