import React from 'react';
import './App.css';
import Navbar from './js/Navbar';
import NowPlaying from './js/NowPlaying';
import Statistics from './js/Statistics';
import Home from './js/Home';
import Info from './js/Info';
import MemoryCard from './js/MemoryCard';
import Wishlist from './js/Wishlist';
import AddHome from './js/AddHome';
import AddSystem from './js/AddSystem';
import AddGame from './js/AddGame';
import Planner from './js/Planner'
import DetailedStatistics from './js/DetailedStatistics'
import About from './js/About';
import Help from './js/Help';
import Settings from './js/Settings';
import Import from './js/Import';
import System from './js/System';
import EditGame from './js/EditGame';
import EditSubGame from './js/EditSubGame';
import {Route, Switch, withRouter} from "react-router-dom";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      content: 'visible',
      refresh: false,
      deletion: '',
      gameState: ''
    }

    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
    this.addSystemRefresh = this.addSystemRefresh.bind(this);
    this.gameStateChange = this.gameStateChange.bind(this);
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

  //refresh state is passed to navbar, so when it changes, navbar is updated with new system
  //deletion param is only used when a system is deleted
  addSystemRefresh(name,deletion=null){
    if (deletion !== null){
      this.setState({refresh: name,deletion:deletion})
    }
    else{
      this.setState({refresh: name, deletion:''})
    }
  }

  gameStateChange(edit=null){
    let randomString = Math.random().toString(36);
    this.setState({gameState: randomString})
    if (edit !== null){
      toast("Game edited successfully!");
    }
  }

  render(){
    return (
      <div className="App">
          <div className='nav'>
            <Navbar refresh={this.state.refresh} deletion={this.state.deletion}/>
          </div>
          <div className='main'>
            <div className='layout'>
              <div className='np_div'>
                <NowPlaying refresh={this.state.gameState}/>
              </div>
              <div className='stats_div'>
                <Statistics newGame={this.state.gameState}/>
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
                        <Route exact path="/Add"><div className='content2'><AddHome /></div></Route>
                        <Route exact path="/Wish"><div className='content2'><Wishlist/></div></Route>
                        <Route exact path="/Plan"><div className='content2'><Planner /></div></Route>
                        <Route exact path="/Mem"><div className='content2'><MemoryCard /></div></Route>
                        <Route exact path="/DS"><div className='content2'><DetailedStatistics /></div></Route>
                        <Route exact path="/System"><div className='content2'><System onChange={this.gameStateChange} refresh={this.state.gameState} deletion={this.addSystemRefresh}/></div></Route>
                        <Route exact path="/AddSys"><div className='content2'><AddSystem onAddSystem={this.addSystemRefresh}/></div></Route>
                        <Route exact path="/AddGame"><div className='content2'><AddGame onAddGame={this.gameStateChange}/></div></Route>
                        <Route exact path="/EditGame"><div className='content2'><EditGame onChange={this.gameStateChange}/></div></Route>
                        <Route exact path="/EditSubGame"><div className='content2'><EditSubGame onChange={this.gameStateChange}/></div></Route>
                        <Route path="/" component={Home}/>
                      </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )
            }/>
            <ToastContainer
                        position="bottom-center"
                        autoClose={2500}
                        hideProgressBar={true}
                        closeOnClick={true}
                        draggable={false}
                        theme={'dark'}
                    />
            </div>
          </div>
      </div>
    );
  }
}
export default withRouter(App);