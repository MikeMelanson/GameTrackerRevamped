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
import SystemDisplay from './js/System';
import {Route, Switch, withRouter} from "react-router-dom";

class App extends React.Component{

  componentDidMount(){
    this.props.history.push('/home');
    fetch('/init');
  }

  render(){
    return (
      <div className="App">
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
              <Route path="/Home" component={Home}/>
              <Route exact path="/Abo" component={About}/>
              <Route exact path="/Help" component={Help}/>
              <Route exact path="/Set" component={Settings}/>
              <Route exact path="/Imp" component={Import}/>
              <Route exact path="/Add" component={AddEditDelete}/>
              <Route exact path="/Wish" component={Wishlist}/>
              <Route exact path="/Plan" component={Planner}/>
              <Route exact path="/Mem" component={MemoryCard}/>
              <Route exact path="/DS" component={DetailedStatistics}/>
              <Route exact path="/System" component={SystemDisplay}/>
              <Route path="/" component={Home}/>
            </Switch>
            </div>
          </div>
      </div>
    );
  }
}
export default withRouter(App);