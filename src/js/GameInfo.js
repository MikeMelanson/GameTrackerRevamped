import React from 'react';

import "../css/gameinfo.css";
import unplayedLogo from '../img/unplayedBIG.png';
import unbeatenLogo from '../img/unbeatenBIG.png';
import beatenLogo from '../img/beatenBIG.png';
import completedLogo from '../img/completedBIG.png';
import nullLogo from '../img/nullBIG.png';

/*
TODO

*/

class GameInfo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subGames: [],
            curSubGame: 0,
        }

        this.changeSubGameL = this.changeSubGameL.bind(this)
        this.changeSubGameR = this.changeSubGameR.bind(this)
    }

    componentDidMount(){
        if (this.props.info[21] === 1){
            let headers = new Headers();
            headers.append('gameID',this.props.info[0]);
            fetch('/sub_games_info', {method: 'GET', headers:headers}).then(res => res.json()).then(data => {
                this.setState({
                    subGames: data.subInfo
                });
            });
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.info !== this.props.info){
            if (this.props.info[21] === 1){
                let headers = new Headers();
                headers.append('gameID',this.props.info[0]);
                fetch('/sub_games_info', {method: 'GET', headers:headers}).then(res => res.json()).then(data => {
                    this.setState({
                        subGames: data.subInfo
                    });
                });
            }
        }
    }

    changeSubGameR(){
        if (this.state.curSubGame === this.state.subGames.length-1){
            this.setState({
                curSubGame: 0
            });
        }
        else{
            this.setState({
                curSubGame: this.state.curSubGame + 1
            })
        }
    }

    changeSubGameL(){
        console.log('Test2')
        if (this.state.curSubGame === 0){
            this.setState({
                curSubGame: this.state.subGames.length-1
            });
        }
        else{
            this.setState({
                curSubGame: this.state.curSubGame - 1
            });
        }
    }

    render(){
        var array = ['','','','','','','','','','','','','','','','','',''];
        var headings = ['Publisher: ','Developer: ','Condition: ','Completeness: ','Region: ','Genre 1: ','Genre 2: ','Notes: ',
                        'Price Paid: ','Rating: ','Time Played: ','Ownership: ','Earned Achievements: ','Total Achievements: ','Number Owned: ',
                        'Date Acquired: ','Acquired From: ','Now Playing: '];
        if (this.props.info.length > 0){
            array[0] = this.props.info[6];
            array[1] = this.props.info[7];
            array[2] = this.props.info[8];
            array[3] = this.props.info[9];
            array[4] = this.props.info[11];
            array[5] = this.props.info[18];
            array[6] = this.props.info[19];
            array[7] = this.props.info[13];
            array[8] = this.props.info[4];
            array[9] = this.props.info[5];
            array[10] = this.props.info[10];
            array[11] = this.props.info[12];
            array[12] = this.props.info[15];
            array[13] = this.props.info[16];
            array[14] = this.props.info[17];
            array[15] = this.props.info[22];
            array[16] = this.props.info[20];
            if (this.props.info[14] === 1){
                array[17] = 'True';
            }
            else{
                array[17] = 'False';
            }
        }
        var div;
        var spans = [];
        var spans2 = [];
        var compSpan = [];
        var compSpan2 = [];
        var img;
        var compImg;
        if (this.props.info[21] === 1 && this.state.subGames.length > 0){
            for (let i=0;i<8;i++){
                if (array[i]){
                    spans.push(<span key={headings[i]+'Comp'} className='infoSpan'>{headings[i]} <span key={headings[i]+'CompText'} className='sinfoText'>{array[i]}</span></span>)   
                }
            }
            spans.push(<div key='compdiv' className='div'><div key='compdiv2' className='np_border'></div></div>)
            for (let i=8; i<18; i++){
                if (array[i] || array[i] === 0){
                    spans2.push(<span key={headings[i]+'Comp'} className='infoSpan'>{headings[i]} <span key={headings[i]+'CompText'} className='sinfoText'>{array[i]}</span></span>)
                }
            }
            spans2.push(<div key='compdiv3' className='div'><div key='compdiv4' className='np_border'></div></div>)
            if (this.state.subGames[this.state.curSubGame][4] === 'Beaten'){
                compImg = <img key='bImgComp' src={beatenLogo} alt='beaten' title='Beaten' className='status_icon_for_game_info'></img>
            }
            else if (this.state.subGames[this.state.curSubGame][4] === 'Completed'){
                compImg = <img key='cImgComp'src={completedLogo} alt='completed' title='Completed' className='status_icon_for_game_info'></img>
            }
            else if (this.state.subGames[this.state.curSubGame][4] === 'Unplayed'){
                compImg = <img key='upImgComp'src={unplayedLogo} alt='unplayed' title='Unplayed' className='status_icon_for_game_info'></img>
            }
            else if (this.state.subGames[this.state.curSubGame][4] === 'Unbeaten'){
                compImg = <img key='ubImgComp'src={unbeatenLogo} alt='unbeaten' title='Unbeaten' className='status_icon_for_game_info'></img>
            }
            else if (this.state.subGames[this.state.curSubGame][4] === 'Null'){
                compImg = <img key='nImgComp'src={nullLogo} alt='null' title='Null' className='status_icon_for_game_info'></img>
            }

            var np;
            if (this.state.subGames[this.state.curSubGame][7] === 1){
                np = 'True'
            }
            else{
                np = 'False'
            }
            compSpan.push(
                        <button key='prev' id='prevSubGame' onClick={this.changeSubGameL}>&#60;</button>,
                        <span key='IMG' className='infoSpan'>{compImg}</span>,
                        <span key='TitleComp' className='infoSpan'>Title: <span key='TitleText' className='sinfoText'>{this.state.subGames[this.state.curSubGame][3]}</span></span>,
                        <span key='RatingComp' className='infoSpan'>Rating: <span key='RatingText' className='sinfoText'>{this.state.subGames[this.state.curSubGame][5]}</span></span>,
                        <span key='NowPlayingComp' className='infoSpan'>Now Playing: <span key='NPText' className='sinfoText'>{np}</span></span>,
                        <button key='next' id='nextSubGame' onClick={this.changeSubGameR}>&#62;</button>
            )
            if (this.state.subGames[this.state.curSubGame][6]){
                compSpan2.push(<span key='Notes2Comp' className='infoSpanNotes'>Notes: <span className='sinfoText'>{this.state.subGames[this.state.curSubGame][6]}</span></span>)
            }
        }
        else{
            for (let i=0;i<8;i++){
                if (array[i]){
                    spans.push(<span key={headings[i]} className='infoSpan'>{headings[i]} <span key={headings[i]+'Text'} className='sinfoText'>{array[i]}</span></span>)   
                }
            }
            for (let i=8; i<18; i++){
                if (array[i] || array[i] === 0){
                    spans2.push(<span key={headings[i]} className='infoSpan'>{headings[i]} <span key={headings[i]+'Text'} className='sinfoText'>{array[i]}</span></span>)
                }
            }
            if (this.props.info[3] === 'Beaten'){
                img = <img key='bImg' src={beatenLogo} alt='beaten' title='Beaten' className='status_icon_for_game_info'></img>
            }
            else if (this.props.info[3] === 'Completed'){
                img = <img key='cImg' src={completedLogo} alt='completed' title='Completed' className='status_icon_for_game_info'></img>
            }
            else if (this.props.info[3] === 'Unplayed'){
                img = <img key='upImg' src={unplayedLogo} alt='unplayed' title='Unplayed' className='status_icon_for_game_info'></img>
            }
            else if (this.props.info[3] === 'Unbeaten'){
                img = <img key='ubImg' src={unbeatenLogo} alt='unbeaten' title='Unbeaten' className='status_icon_for_game_info'></img>
            }
            else if (this.props.info[3] === 'Null'){
                img = <img key='nImg' src={nullLogo} alt='null' title='Null' className='status_icon_for_game_info'></img>
            }
        }
        div = [<div key='spans' className='spans'>{spans}</div>,
                <div key='spans2' className='spans'>{spans2}</div>,
                <div key='comp_spans' className='comp_spans'>{compSpan}{compSpan2}</div>]
        return (
            <>
                <div className='holder'>
                    <div className='title'>
                        {this.props.info[1]}
                        <div>{img}</div>
                    </div>
                    <div className='div'><div className='np_border'></div></div>
                    <div className='changingInfo'>
                        {div}
                    </div>
                    
                </div>
            </>
        );
    }   
}

export default GameInfo;