import React from 'react';
import './App.css';
import Navbar from './js/Navbar';
import NowPlaying from './js/NowPlaying';
import Statistics from './js/Statistics';
import Home from './js/Home';
import Info from './js/Info';

function App(){
  return (
    <div className="App">
      <div className='nav'>
        <Navbar className/>
      </div>
      <div className='main'>
        <div className='layout'>
          <div className='np_div'>
            <NowPlaying/>
          </div>
          <div className='stats_div'>
            <Statistics/>
          </div>
          <div className='info_div'>
            <Info/>
          </div>
        </div>
        <div className='content'>
          <Home/>
        </div>
      </div>
    </div>
  );
}
export default App;