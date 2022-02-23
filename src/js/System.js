import React from 'react';
import SystemInfo from './SystemInfo';
import GamesList from './GamesList';
import GameFilters from './GameFilters';
import GameInfo from './GameInfo';
import {withRouter} from 'react-router-dom';

import "../css/system.css";

/*
TODO

*/

class System extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            systemInfo: [],
            curGameInfo: [],
            image: '',
            gameImage: '',
            initGame: '',
            systemInfoComponent: '',
            gamesListComponent: '',
            gameInfoComponent: '',
        }

        this.getFilters = this.getFilters.bind(this);
        this.getSelectedGame = this.getSelectedGame.bind(this);
    }

    getFilters(data){
        //retrieve data from GameFilters child, store in state, and pass to GamesList child
        if (data === 'clear'){
            this.setState({
                gamesListComponent: <GamesList info={this.state.systemInfo[1]} getSelectedGame={this.getSelectedGame}/>
            })
        }
        else{
            this.setState({
                gamesListComponent: <GamesList info={this.state.systemInfo[1]} filters={data} getSelectedGame={this.getSelectedGame}/>
            }) 
        }
    }

    getSelectedGame(game){
        this.fetchGameInfo(game)
    }

    componentDidMount(){
        this.fetchInfo();
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.systemInfo !== this.state.systemInfo){
            this.setState({
                systemInfoComponent: <SystemInfo info={this.state.systemInfo}/>,
                gamesListComponent: <GamesList info={this.state.systemInfo[1]} getSelectedGame={this.getSelectedGame}/>,
            });
        }
    }

    async fetchInfo(){
        let systemHeader = new Headers();
        systemHeader.append('System',this.props.location.state.system.toString());
        await fetch('/system_info', {method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
            this.setState({
                systemInfo:data.systemInfo,
                image:data.image
            });
        });
        await fetch('/init_game', {method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
            this.setState({
                initGame: data.init[0],
            });
        });
        this.fetchGameInfo(this.state.initGame)
    }

    async fetchGameInfo(game){
        let systemHeader = new Headers();
        systemHeader.append('system',this.state.systemInfo[1]);
        systemHeader.append('game',game)
        await fetch('/game_info', {method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
            this.setState({
                curGameInfo: data.gameInfo,
                gameImage: data.image,
                gameInfoComponent: <GameInfo info={data.gameInfo}/>
            });
        });
    }
    
    render(){
        var imageString = '';
        if (this.state.systemInfo.length !==0){
            imageString = this.state.image.replace(/(\r\n|\n|\r)/gm, "")
        }
        var gameImageString = '';
        if (this.state.curGameInfo.length !==0){
            gameImageString = this.state.gameImage.replace(/(\r\n|\n|\r)/gm, "")
        }
        return (
            <>
                <div className='system'>
                    <div className='quadrant' id='big1' style={{backgroundImage:"url('data:image/png;base64,"+imageString+"')",backgroundSize:'100% 100%'}}>
                        {this.state.systemInfoComponent}
                    </div>
                    <div className='quadrant' id='small1'>
                        <GameFilters getFilters={this.getFilters}/>
                    </div>
                    <div className='quadrant' id='small2'>
                        {this.state.gamesListComponent}
                    </div>
                    <div className='quadrant' id='big2' style={{backgroundImage:"url('data:image/png;base64,"+gameImageString+"')",backgroundSize:'100% 100%'}}>
                        {this.state.gameInfoComponent}
                    </div>
                </div>
            </>
        );
    }   
}

export default withRouter(System);