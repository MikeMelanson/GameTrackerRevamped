import React from 'react';
import SystemInfo from './SystemInfo'
import {withRouter} from 'react-router-dom';

import "../css/system.css";

class System extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            systemInfo: [],
            image: '',
            systemInfoComponent: ''
        }
    }

    componentDidMount(){
        this.fetchInfo();
    }
    componentDidUpdate(prevProps,prevState){
        if (prevState.systemInfo !== this.state.systemInfo){
            this.setState({
                systemInfoComponent: <SystemInfo info={this.state.systemInfo}/>
            });
        }
    }

    async fetchInfo(){
        let systemHeader = new Headers();
        systemHeader.append('System',this.props.location.state.system.toString());
        await fetch('/system_info', {method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
            this.setState({
                systemInfo:data.systemInfo,
                image:data.image
            });
        });
    }
    
    render(){
        var imageString = '';
        if (this.state.systemInfo.length !==0){
            imageString = this.state.image.replace(/(\r\n|\n|\r)/gm, "")
        }
        return (
            <>
                <div className='system'>
                    <div className='quadrant' id='big1' style={{backgroundImage:"url('data:image/png;base64,"+imageString+"')",backgroundSize:'100% 100%'}}>
                        {this.state.systemInfoComponent}
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