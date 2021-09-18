import React from 'react';
import './App.css';
import Navbar from './js/Navbar';
import NowPlaying from './js/NowPlaying';
import Statistics from './js/Statistics';
import Home from './js/Home';

function App(){
  return (
    <div className="App">
      <div className='nav'>
        <Navbar className/>
      </div>
      <div className='main'>
        <table className='layout'>
          <tr>
            <td><NowPlaying /></td>
          </tr>
          <tr>
            <td><Statistics /></td>
          </tr>
        </table>
        <div className='content'>
          <Home/>
        </div>
      </div>
    </div>
  );
}

export default App;