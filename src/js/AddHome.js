import React from "react";
import {Link} from 'react-router-dom'

import "../css/addhome.css";

class AddHome extends React.Component{
    render(){
        return(
            <>
                <div className='add_buttons'>
                    <button><Link to='/AddSys' style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center'}}>Add System</Link></button>
                    <button><Link to='/AddGame' style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center'}}>Add Game</Link></button>
                </div>
            </>
        )
    }
}

export default AddHome;