import React from 'react';
import logo from './logo.svg';
import './App.css';
import TableExample from './Components/table/table.component';
import DialPad from './Components/DialPad/dialPad.component';

const App: React.FC = () => {
  return (
    <div className="App">
    <DialPad/>
    <TableExample/>
    </div>
  );
}

export default App;
