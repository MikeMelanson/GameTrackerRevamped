import React from 'react';
import SystemInfo from './SystemInfo'
import {withRouter} from 'react-router-dom';

import "../css/system.css";

class System extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            systemInfo: []
        }
    }

    componentDidMount(){
        let systemHeader = new Headers();
        systemHeader.append('System',this.props.location.state.system.toString());
        fetch('/system_info', {method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
            this.setState({
                systemInfo:data.systemInfo
            });
        });
        console.log(this.state.systemInfo)
    }
    
    render(){
        return (
            <>
                <div className='system'>
                    <div className='systemInfo'>
                        <SystemInfo 
                            info={this.state.systemInfo}
                        />
                    </div>
                    <div className='gamesList'>
                        Games List
                    </div>
                    <div className='gameInfo'>
                        Game Info
                    </div>
                </div>
            </>
        );
    }   
}

export default withRouter(System);