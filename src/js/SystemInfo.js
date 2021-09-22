import React from 'react';

import "../css/systeminfo.css";

class SystemInfo extends React.Component{
    render(){
        var title = '';
        if (this.props.info.length > 0){
            title = this.props.info[0][0];
            console.log(this.props.info)
        }
        
        return (
            <>
                <div>
                    {title}
                </div>
            </>
        );
    }   
}

export default SystemInfo;