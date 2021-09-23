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
            console.log(data.image)
            this.setState({
                systemInfo:data.systemInfo
            });
        });
    }
    
    render(){
        var imageString = '';
        if (this.state.systemInfo.length !==0){
            imageString = this.state.systemInfo[0][11]
        }
        return (
            <>
                <div className='system'>
                    <div className='quadrant' id='big1' style={{backgroundImage:'url(../../images/'+imageString+'.png)',backgroundSize:'100% 100%'}}>
                        <SystemInfo
                            info={this.state.systemInfo}
                        />
                    </div>
                    <div className='quadrant' id='small1'>
                        Games Filter
                    </div>
                    <div className='quadrant' id='small2'>
                        Game List
                    </div>
                    <div className='quadrant' id='big2'>
                        Game Info
                    </div>
                </div>
            </>
        );
    }   
}

export default withRouter(System);