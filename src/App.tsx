import React from 'react';
import logo from './logo.svg';
import './App.css';
import DialPad from './Components/DialPad/dialPad.component';

const App: React.FC = () => {
  return (

  <div style={{width:'200px'}} className='main-container'>
  <DialPad/>
  {/* <DialPad/> */}
  </div>
  );
}

export default App;
