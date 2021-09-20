import React from 'react';
import NowPlayingGame from './NowPlayingGame';

import "../css/nowplaying.css";

class NowPlaying extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            gamesList: [],
        }
    }

    componentDidMount(){
        fetch('/np').then(res => res.json()).then(data => {
            var np = data.np
            console.log(np)
            this.setState({gamesList:np});
            console.log(this.state.games_list)
        });
    }

    render(){
        var games = [];
        for (let i=0;i< this.state.gamesList.length;i++){
            games.push(<NowPlayingGame key={this.state.gamesList[i][0]} title={this.state.gamesList[i][0]}
                system={this.state.gamesList[i][1]}></NowPlayingGame>);
        }
        console.log(games)
        return (
            <>
                <div className="np">
                    <div className='np_title'>Now Playing</div>
                    <div className='div'>
                        <div className='np_border'></div>
                    </div>
                    <div className='games_area'>
                        {games}
                    </div>
                </div>
            </>
        );
    }   
}

export default NowPlaying;