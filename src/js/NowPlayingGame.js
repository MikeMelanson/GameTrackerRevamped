import React from 'react';
import {FaEdit} from 'react-icons/fa';
import unplayedLogo from '../img/unplayed.png';
import unbeatenLogo from '../img/unbeaten.png';
import beatenLogo from '../img/beaten.png';
import completedLogo from '../img/completed.png';
import nullLogo from '../img/null.png';
import {Link} from 'react-router-dom'

import "../css/nowplayinggame.css";

class NowPlayingGame extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            curGameInfo: [],
        }
    }

    async fetchInfo(){
        if (this.props.gameType === 1){
            let systemHeader = new Headers();
            systemHeader.append('gameID',this.props.gID);
            await fetch('/game_info_ID', {method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
                this.setState({
                    curGameInfo: data.gameInfo,
                });
            });
        }
        else{
            let headers = new Headers();
            headers.append('gameID',this.props.gID);
            await fetch('/single_sub_game_info', {method: 'GET', headers:headers}).then(res => res.json()).then(data => {
                this.setState({
                    curGameInfo: data.subGame
                });
            });
        }
    }

    componentDidMount(){
        this.fetchInfo()
    }

    render(){
        var edit;
        if (this.props.gameType === 0){
            edit = <button className='np_edit_b'><Link to={{pathname:'/EditSubGame',state:{info:this.state.curGameInfo}}}><FaEdit size={28}/></Link></button>
        }
        else{
            edit = <button className='np_edit_b'><Link to={{pathname:'/EditGame',state:{info:this.state.curGameInfo}}}><FaEdit size={28}/></Link></button>
        }
        
        var status;
        if (this.props.status === 'Unplayed'){
            status = <img src={unplayedLogo} alt='unplayed'></img>
        }
        else if (this.props.status === 'Unbeaten'){
            status = <img src={unbeatenLogo} alt='unbeaten'></img>
        }
        else if (this.props.status === 'Beaten'){
            status = <img src={beatenLogo} alt='beaten'></img>
        }
        else if (this.props.status === 'Completed'){
            status = <img src={completedLogo} alt='completed'></img>
        }
        else if (this.props.status === 'Null'){
            status = <img src={nullLogo} alt='null'></img>
        }
        return (
            <>
                <div className="npg">
                    {edit}
                    {status}
                    <div className='system_text'>({this.props.system})</div>
                    <div className='game_text'>{this.props.title}</div>
                </div>
                <div className='sub_div_container'><div className='sub_div'></div></div>
            </>
        );
    }   
}

export default NowPlayingGame;