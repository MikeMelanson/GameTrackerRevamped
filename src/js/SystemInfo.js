import React from 'react';
import unplayedLogo from '../img/unplayed.png';
import unbeatenLogo from '../img/unbeaten.png';
import beatenLogo from '../img/beaten.png';
import completedLogo from '../img/completed.png';
import nullLogo from '../img/null.png';

import "../css/systeminfo.css";

class SystemInfo extends React.Component{
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
            total: 0,
        }
    }

    componentDidMount(){
        let systemHeader = new Headers();
        if (this.props.info.length > 0){
            systemHeader.append('System',this.props.info[0][0].toString());
        }
        else{
            systemHeader.append('System','');
        }
        fetch('/spec_system_totals',{method: 'GET', headers:systemHeader}).then(res => res.json()).then(data => {
            this.setState({beaten:data.beaten,completed:data.completed,unplayed:data.unplayed,unbeaten:data.unbeaten,nullg:data.nullg,unplayedPercent:data.unplayedP
                ,unbeatenPercent:data.unbeatenP,beatenPercent:data.beatenP,completedPercent:data.completedP,nullPercent:data.nullP,total:data.total});
        });
        console.log(this.props.systemInfo)
    }

    render(){
        var array = ['','','','','','','','','',''];
        var headings = ['Format: ','Publisher: ','Price Paid: ','Ownership: ','Number Owned: ',
            'Number of Controllers: ','Region: ','Notes: ','Date Acquired: ','Date Added: '];
        if (this.props.info.length > 0){
            array[0] = this.props.info[1];
            array[1] = this.props.info[2];
            array[2] = this.props.info[3];
            array[3] = '$' + this.props.info[4];
            array[4] = this.props.info[5];
            array[5] = this.props.info[6];
            array[6] = this.props.info[7];
            array[7] = this.props.info[8];
            array[8] = this.props.info[9];
            array[9] = this.props.info[10];
            array[10] = this.props.info[11].split(' ')[0];
            array[11] = this.props.info[12];
        }
        var spans = [];
        var spans2 = [];
        for (let i=1;i<8;i++){
            if (array[i]){
                spans.push(<span className='infoSpan'>{headings[i-1]} <span className='sinfoText'>{array[i]}</span></span>)
            }
        }
        for (let i=8; i<11; i++){
            if (array[i]){
                spans2.push(<span className='infoSpan'>{headings[i-1]} <span className='sinfoText'>{array[i]}</span></span>)
            }
        }

        spans2.push(<div className='div'><div className='np_border'></div></div>)
        spans2.push(<span className='infoSpan'>Total Games: <span className='sinfoText'>{this.state.total}</span></span>)

        return (
            <>
                <div className='systemName'>
                    {array[0]}
                    <div className='div'><div className='np_border'></div></div>
                </div>
                <div className='info'>
                    <div className='spans'>
                        {spans}
                    </div>
                    <div className='spans'>
                        {spans2}
                        <div className='s_stats_content'>
                            <span className='num'>{this.state.unplayed}</span>
                            <img src={unplayedLogo} alt='unplayed' title='Unplayed'></img> 
                            <progress id='unplayed' value={this.state.unplayedPercent} max='100'></progress>
                            <span className='percent'>{this.state.unplayedPercent}%</span>

                            <span className='num'>{this.state.unbeaten}</span>
                            <img src={unbeatenLogo} alt='unbeaten' title='Unbeaten'></img> 
                            <progress id='unbeaten' value={this.state.unbeatenPercent} max='100'></progress>
                            <span className='percent'>{this.state.unbeatenPercent}%</span>

                            <span className='num'>{this.state.beaten}</span>
                            <img src={beatenLogo} alt='beaten' title='Beaten'></img>
                            <progress id='beaten' value={this.state.beatenPercent} max='100'></progress>
                            <span className='percent'>{this.state.beatenPercent}%</span>

                            <span className='num'>{this.state.completed}</span>
                            <img src={completedLogo} alt='completed' title='Completed'></img>
                            <progress id='completed' value={this.state.completedPercent} max='100'></progress>
                            <span className='percent'>{this.state.completedPercent}%</span>
                            
                            <span className='num'>{this.state.nullg}</span>
                            <img src={nullLogo} alt='null' title='Null'></img>
                            <progress id='null' value={this.state.nullPercent} max='100'></progress>
                            <span className='percent'>{this.state.nullPercent}%</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }   
}

export default SystemInfo;