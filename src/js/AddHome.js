import React from "react";
import {Link} from 'react-router-dom'

class AddHome extends React.Component{
    render(){
        return(
            <>
                <div className='add_buttons'>
                    <button><Link to='/AddSys'>Add System</Link></button>
                    <button><Link to='/AddGame'>Add Game</Link></button>
                </div>
            </>
        )
    }
}

export default AddHome;