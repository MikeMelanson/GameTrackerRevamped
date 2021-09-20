import React from 'react';
import unplayedLogo from '../img/unplayed.png';
import unbeatenLogo from '../img/unbeaten.png';
import beatenLogo from '../img/beaten.png';
import completedLogo from '../img/completed.png';
import nullLogo from '../img/null.png';

import "../css/statistics.css";

class Statistics extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            beaten: 0,
            completed: 0,
            unplayed: 0,
            unbeaten: 0,
            nullg: 0,
            unplayedPercent: 0,
            unbeatenPercent: 0,
            beatenPercent: 0,
            completedPercent: 0,
            nullPercent: 0,
        }
    }

    componentDidMount(){
        fetch('/status_totals').then(res => res.json()).then(data => {
            this.setState({beaten:data.beaten,completed:data.completed,unplayed:data.unplayed,unbeaten:data.unbeaten,nullg:data.nullg,
            unplayedPercent:data.unplayedP,unbeatenPercent:data.unbeatenP,beatenPercent:data.beatenP,completedPercent:data.completedP,nullPercent:data.nullP});
        });        
    }

    render(){
        return (
            <>
                <div className='stats'>
                    <div className='stats_title'>
                        Statistics    
                        <div></div>
                    </div>
                    <div className='div'>
                        <div className='np_border'></div>
                    </div>
                    <div className='stats_content'>
                        <p className='num'>{this.state.unplayed}</p>
                        <img src={unplayedLogo} alt='unplayed' title='Unplayed'></img> 
                        <progress id='unplayed' value={this.state.unplayedPercent} max='100'></progress>
                        <p className='percent'>{this.state.unplayedPercent}%</p>

                        <p className='num'>{this.state.unbeaten}</p>
                        <img src={unbeatenLogo} alt='unbeaten' title='Unbeaten'></img> 
                        <progress id='unbeaten' value={this.state.unbeatenPercent} max='100'></progress>
                        <p className='percent'>{this.state.unbeatenPercent}%</p>

                        <p className='num'>{this.state.beaten}</p>
                        <img src={beatenLogo} alt='beaten' title='Beaten'></img>
                        <progress id='beaten' value={this.state.beatenPercent} max='100'></progress>
                        <p className='percent'>{this.state.beatenPercent}%</p>

                        <p className='num'>{this.state.completed}</p>
                        <img src={completedLogo} alt='completed' title='Completed'></img>
                        <progress id='completed' value={this.state.completedPercent} max='100'></progress>
                        <p className='percent'>{this.state.completedPercent}%</p>
                        
                        <p className='num'>{this.state.nullg}</p>
                        <img src={nullLogo} alt='null' title='Null'></img>
                        <progress id='null' value={this.state.nullPercent} max='100'></progress>
                        <p className='percent'>{this.state.nullPercent}%</p>
                    </div>
                </div>
            </>
        );
    }
}
export default Statistics