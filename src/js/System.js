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

            reload: '',
            subGamesInfoForDeletion: [],
        }

        this.getFilters = this.getFilters.bind(this);
        this.getSelectedGame = this.getSelectedGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.deleteSubGame = this.deleteSubGame.bind(this);
    }

    getFilters(data){
        //retrieve data from GameFilters child, store in state, and pass to GamesList child
        if (data === 'clear'){
            this.setState({
                gamesListComponent: <GamesList info={this.state.systemInfo[1]} getSelectedGame={this.getSelectedGame} refresh={this.props.refresh}/>
            })
        }
        else{
            this.setState({
                gamesListComponent: <GamesList info={this.state.systemInfo[1]} filters={data} getSelectedGame={this.getSelectedGame} refresh={this.props.refresh}/>
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
        if (prevState.systemInfo !== this.state.systemInfo || this.props.refresh !== prevProps.refresh){
            this.setState({
                systemInfoComponent: <SystemInfo info={this.state.systemInfo} refresh={this.props.refresh}/>,
                gamesListComponent: <GamesList info={this.state.systemInfo[1]} getSelectedGame={this.getSelectedGame} refresh={this.props.refresh}/>,
            });
        }        
        if (this.props.refresh !== prevProps.refresh){
            this.fetchGameInfo(this.state.curGameInfo[1])
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
                gameInfoComponent: <GameInfo info={data.gameInfo} delete={this.deleteGame} deleteSubGame={this.deleteSubGame} refresh={this.props.refresh}/>
            });
        });
    }

    async deleteGame(game,system){
        let headers = new Headers();
        headers.append('gameID',game);
        fetch('/sub_games_info', {method: 'GET', headers:headers}).then(res => res.json()).then(data => {
            this.setState({
                subGamesInfoForDeletion: data.subInfo
            });
        });
        for (let i=0;i<this.state.subGamesInfoForDeletion.length;i++){
            this.deleteSubGame(this.subGamesInfoForDeletion[i][1],this.state.subGamesInfoForDeletion[i][2])
        }
        await fetch('/delete_game', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials" : true 
            },
            body:JSON.stringify({
                system: system,
                game: game
            })}
        )
        this.props.onChange();
    }

    async deleteSubGame(game,subGame){
        await fetch('/delete_sub_game', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials" : true 
            },
            body:JSON.stringify({
                game: game,
                subGame: subGame
            })}
        )
        this.props.onChange();
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