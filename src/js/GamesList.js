import React from 'react';
import GamesListEntry from './GamesListEntry';

import "../css/gameslist.css";

/*
TODO

*/

class GamesList extends React.Component{
    //_isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            title: [],
            gamesListComponents: [],
        }

        this.getSelectedGame = this.getSelectedGame.bind(this)
    }
    
    componentDidMount(){
        //this._isMounted = true;
        this.retrieveGames();
    }

    async retrieveGames(filters=[{"status":"","publisher":"","developer":"","condition":"","completeness":"",
                                    "region":"","ownership":"","genre1":"","genre2":"","pricePaid1":"","pricePaid2":"","rating1":"","rating2":""}]){
        let systemHeader = new Headers();
        //receive system name from props, pass in headers to API
        systemHeader.append('system',this.props.info);
        systemHeader.append('filters',JSON.stringify(filters));
        this.setState({title:[]});
        await fetch('/games_list_games', {method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
            //store all game titles in state
            var l = data.games.length
            for (let i=0;i<l;i++){
                this.setState(prevState => ({
                    title: [...prevState.title,data.games[i]]
                }))
            }
        });
    }

    componentDidUpdate(prevProps){
        if (prevProps.filters !== this.props.filters || prevProps.refresh !== this.props.refresh){
            this.retrieveGames(this.props.filters)
        }
    }

    /*componentWillUnmount(){
        this._isMounted = false;
    }*/

    getSelectedGame(game){
        this.props.getSelectedGame(game)
    }
    
    render(){
        //create a GamesListEntry for every game in "title" State
        var length;
        length = this.state.title.length
        var entries = [];
        for (let i=0;i<length;i++){
            entries.push(<GamesListEntry key={this.state.title[i]} title={this.state.title[i]} getSelectedGame={this.getSelectedGame}></GamesListEntry>);
        }
        return (
            <>
                <div>
                    {entries}
                </div>
            </>
        );
    }   
}

export default GamesList;