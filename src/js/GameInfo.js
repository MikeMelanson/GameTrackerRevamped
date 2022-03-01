import React from 'react';

import "../css/gameinfo.css";
import unplayedLogo from '../img/unplayedBIG.png';
import unbeatenLogo from '../img/unbeatenBIG.png';
import beatenLogo from '../img/beatenBIG.png';
import completedLogo from '../img/completedBIG.png';
import nullLogo from '../img/nullBIG.png';
import {FaRegTrashAlt,FaEdit} from 'react-icons/fa';

/*
TODO

*/

class GameInfo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subGames: [],
            curSubGame: 0,

            modalIsOpen: false,
            delSubGame: false,
        }

        this.changeSubGameL = this.changeSubGameL.bind(this)
        this.changeSubGameR = this.changeSubGameR.bind(this)
        this.deleteGame = this.deleteGame.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
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
        if (prevProps.info !== this.props.info || prevProps.refresh !== this.props.refresh){
            if (this.props.info[21] === 1){
                let headers = new Headers();
                headers.append('gameID',this.props.info[0]);
                fetch('/sub_games_info', {method: 'GET', headers:headers}).then(res => res.json()).then(data => {
                    this.setState({
                        subGames: data.subInfo,
                        curSubGame: 0,
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

    openTab(url){
        var win = window.open(url, '_blank','noopener,noreferrer');
        win.focus();
    }

    editGame(){

    }

    openModal(changeState){
        this.setState({modalIsOpen: true});
        if (changeState){
            this.setState({delSubGame:true})
        }
    }

    closeModal(){
        this.setState({modalIsOpen: false,delSubGame:false});
    }

    deleteGame(){
        if (this.state.delSubGame){
            this.props.deleteSubGame(this.props.info[0],this.state.subGames[this.state.curSubGame][2])
        }
        else{
            this.props.delete(this.props.info[0],this.props.info[2])
        }
        this.setState({modalIsOpen: false,delSubGame:false});
    }

    render(){
        console.log(this.props.info[1])
        var modal = [];
        if (this.state.modalIsOpen){
            var height1;
            if (this.divElement.clientHeight <= this.divElement.parentElement.clientHeight){
                height1 = '100%'
            }
            else{
                height1 = this.divElement.clientHeight
            }
            modal.push(
                <div className='modal' style={{height:height1}}>
                    <div className='message'>Are you sure you want to delete this game?<br></br>This cannot be undone.</div>
                    <div>
                        <button onClick={this.deleteGame}>Yes, Delete</button>
                        <button onClick={this.closeModal}>No, Don't Delete</button>
                    </div>
                </div>
            )
        }

        var array = ['','','','','','','','','','','','','','','','','',''];
        var headings = ['Publisher: ','Developer: ','Condition: ','Completeness: ','Region: ','Genre 1: ','Genre 2: ','Notes: ',
                        'Price Paid: ','Rating: ','Time Played: ','Ownership: ','Earned Achievements: ','Total Achievements: ','Number Owned: ',
                        'Date Acquired: ','Acquired From: '];
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
            array[17] = this.props.info[25];
            array[18] = this.props.info[26];
        }
        var div;
        var spans = [];
        var spans2 = [];
        var compSpan = [];
        var compSpan2 = [];
        var img;
        var compImg;
        var title;
        if (this.props.info[21] === 1 && this.state.subGames.length > 0){
            for (let i=0;i<8;i++){
                if (array[i]){
                    spans.push(<span key={headings[i]+'Comp'} className='infoSpan'>{headings[i]} <span key={headings[i]+'CompText'} className='sinfoText'>{array[i]}</span></span>)   
                }
            }
            for (let i=8; i<17; i++){
                if (array[i]){
                    spans2.push(<span key={headings[i]+'Comp'} className='infoSpan'>{headings[i]} <span key={headings[i]+'CompText'} className='sinfoText'>{array[i]}</span></span>)
                }
            }

            if (array[17]){
                spans2.push(<span key='link' className='infoSpan'>Value: <span key='value' className='sinfoText'>${array[18]}</span>
                                <a href={() => this.openTab(array[17])} onClick={() => this.openTab(array[17])}>Value Link</a>
                            </span>)
            }
            else if (this.props.info[1] !== undefined){
                spans2.push(<span key='link' className='infoSpan'>Value: <span key='value' className='sinfoText'>${array[18]}</span>
                            </span>)
            }

            compSpan.push(<div key='compdiv' className='div_info'><div key='compdiv2' className='np_border'></div></div>)
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

            compSpan.push(
                        <button key='prev' className='changeSubGame' onClick={this.changeSubGameL}>&#60;</button>,
                        <span key='IMG' className='infoSpan' id='comp_status_img'>{compImg}</span>,
                        <span key='TitleComp' className='infoSpan'>Title: <span key='TitleText' className='sinfoText'>{this.state.subGames[this.state.curSubGame][3]}</span></span>,
                        <span key='RatingComp' className='infoSpan'>Rating: <span key='RatingText' className='sinfoText'>{this.state.subGames[this.state.curSubGame][5]}</span></span>,
                        <span key='comp_buttons' className='comp_buttons'><button onClick={this.editGame}><FaEdit size={28}/></button><button onClick={() => this.openModal(true)}><FaRegTrashAlt size={28}/></button></span>,
                        <button key='next' className='changeSubGame' onClick={this.changeSubGameR}>&#62;</button>
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
            for (let i=8; i<17; i++){
                if (array[i] || array[i] === 0){
                    spans2.push(<span key={headings[i]} className='infoSpan'>{headings[i]} <span key={headings[i]+'Text'} className='sinfoText'>{array[i]}</span></span>)
                }
            }

            if (array[17]){
                spans2.push(<span key='link' className='infoSpan'>Value: <span key='value' className='sinfoText'>${array[18]}</span>
                                <a href={() => this.openTab(array[17])} onClick={() => this.openTab(array[17])}>Value Link</a>
                            </span>)
            }
            else if (this.props.info[1] !== undefined){
                spans2.push(<span key='link' className='infoSpan'>Value: <span key='value' className='sinfoText'>${array[18]}</span>
                            </span>)
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
        if (this.props.info[1] === undefined){
            title=[]
        }
        else{
            title=[<div className='title' >
                    {this.props.info[1]}
                    <div>{img}</div>
                    <div><button onClick={this.editGame}><FaEdit size={28}/></button></div>
                    <div><button onClick={() => this.openModal(false)}><FaRegTrashAlt size={28}/></button></div>
                    </div>]
        }
        return (
            <>
                {modal}
                <div className='holder' ref={(divElement) => { this.divElement = divElement}}>
                    {title}
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