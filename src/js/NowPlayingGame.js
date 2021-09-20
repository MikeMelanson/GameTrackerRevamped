import React from 'react';
import {FaEdit} from 'react-icons/fa';
import unplayedLogo from '../img/unplayed.png';
import unbeatenLogo from '../img/unbeaten.png';
import beatenLogo from '../img/beaten.png';
import completedLogo from '../img/completed.png';
import nullLogo from '../img/null.png';

import "../css/nowplayinggame.css";

class NowPlayingGame extends React.Component{
    render(){
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
                    <button className='np_edit_b'><FaEdit size={20}/></button>
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