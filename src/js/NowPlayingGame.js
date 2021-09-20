import React from 'react';
import {FaEdit} from 'react-icons/fa';

import "../css/nowplayinggame.css";

class NowPlayingGame extends React.Component{
    render(){
        return (
            <>
                <div className="npg">
                    <button className='np_edit_b'><FaEdit size={20}/></button>
                    <div className='system_text'>({this.props.system})</div>
                    <div className='game_text'>{this.props.title}</div>
                </div>
                <div className='sub_div_container'><div className='sub_div'></div></div>
            </>
        );
    }   
}

export default NowPlayingGame;