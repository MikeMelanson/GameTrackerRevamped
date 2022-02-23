import React from 'react';

import "../css/gameslistentry.css";

class GamesListEntry extends React.Component{
    constructor(props){
        super(props);

        this.displayGame = this.displayGame.bind(this)
    }

    displayGame(event){
        var selectedGame = event.target.id
        this.props.getSelectedGame(selectedGame)
    }
    
    render(){
        return (
            <>
                <div className='glEntry' id={this.props.title} onClick={this.displayGame}>
                    {this.props.title}
                </div>
            </>
        );
    }   
}

export default GamesListEntry;