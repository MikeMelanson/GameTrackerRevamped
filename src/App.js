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
import System from './js/System';
import {Route, Switch, withRouter} from "react-router-dom";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      content: 'visible'
    }

    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
  }
  
  componentDidMount(){
    this.props.history.push('/home');
    fetch('/init');
  }

  onEnter(){
    this.setState({
      content: 'hidden'
    })
  }

  onExit(){
    this.setState({
      content: 'visible'
    })
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
            <div className='content' 
              style={
                {overflow: this.state.content}
              }
            >
            <Route render={ ({location}) =>
              (
                <TransitionGroup>
                  <CSSTransition timeout={800}
                    classNames='pageSlider'
                    key={location.key}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    onEnter={this.onEnter}
                    onExited={this.onExit}
                    appear={false}
                    in={false}>
                      <Switch location={location}>
                        <Route path="/Home"><div className='content2'><Home /></div></Route>
                        <Route exact path="/Abo"><div className='content2'><About /></div></Route>
                        <Route exact path="/Help"><div className='content2'><Help /></div></Route>
                        <Route exact path="/Set"><div className='content2'><Settings /></div></Route>
                        <Route exact path="/Imp"><div className='content2'><Import /></div></Route>
                        <Route exact path="/Add"><div className='content2'><AddEditDelete /></div></Route>
                        <Route exact path="/Wish"><div className='content2'><Wishlist/></div></Route>
                        <Route exact path="/Plan"><div className='content2'><Planner /></div></Route>
                        <Route exact path="/Mem"><div className='content2'><MemoryCard /></div></Route>
                        <Route exact path="/DS"><div className='content2'><DetailedStatistics /></div></Route>
                        <Route exact path="/System"><div className='content2'><System/></div></Route>
                        <Route path="/" component={Home}/>
                      </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )
            }/>
            </div>
          </div>
      </div>
    );
  }
}
export default withRouter(App);