import React from 'react';

//import "../css/addeditdelete.css";

class GamesListEntry extends React.Component{
    /*
    constructor(props){
        super(props);
    }*/
    
    render(){
        return (
            <>
                <div>
                    {this.props.title}
                </div>
            </>
        );
    }   
}

export default GamesListEntry;