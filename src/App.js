import React from 'react';
import './App.css';
import Navbar from './js/Navbar';
import NowPlaying from './js/NowPlaying';
import Statistics from './js/Statistics';
import Home from './js/Home';
import Info from './js/Info';
import MemoryCard from './js/MemoryCard';
import Wishlist from './js/Wishlist';
import AddEditDelete from './js/AddEditDelete';
import Planner from './js/Planner'
import DetailedStatistics from './js/DetailedStatistics'
import About from './js/About';
import Help from './js/Help';
import Settings from './js/Settings';
import Import from './js/Import';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App(){
  return (
    <div className="App">
      <Router>
        <div className='nav'>
          <Navbar/>
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
          <Switch>
            <Route path="/Abo" component={About}/>
            <Route path="/Help" component={Help}/>
            <Route path="/Set" component={Settings}/>
            <Route path="/Imp" component={Import}/>
            <Route path="/Add" component={AddEditDelete}/>
            <Route path="/Wish" component={Wishlist}/>
            <Route path="/Plan" component={Planner}/>
            <Route path="/Mem" component={MemoryCard}/>
            <Route path="/DS" component={DetailedStatistics}/>
            <Route path="/Home" component={Home}/>
            <Route path="/" component={Home}/>
          </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
export default App;