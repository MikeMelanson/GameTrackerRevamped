import React from 'react';
import {withRouter} from 'react-router-dom';

//import "../css/detailedstatistics.css";

class System extends React.Component{
    render(){
        const system = this.props.location.state.system;
        return (
            <>
                <div>
                    {system}
                </div>
            </>
        );
    }   
}

export default withRouter(System);