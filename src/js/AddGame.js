import React from 'react';
import {CSSTransition} from 'react-transition-group'
import AddSubGame from './AddSubGame';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../css/addgame.css";

class AddGame extends React.Component{
    constructor(props){
        super(props);

        this.addSubGameClick = this.addSubGameClick.bind(this);
        this.removeSubGameClick = this.removeSubGameClick.bind(this);

        this.state = {
            title: '',
            system: '',
            status: '',
            pricePaid: '',
            rating: '',
            publisher: '',
            developer: '',
            condition: '',
            completeness: '',
            timePlayed: '',
            region: '',
            ownership: '',
            notes: '',
            nowPlaying: 0,
            eAcheive: 0,
            tAchieve: 0,
            owned: '',
            genre1: '',
            genre2: '',
            acquiredFrom: '',
            compilation: 0,
            dateAcq: '',
            img: '',

            imgKey: '',

            publishers: [<option key = 'pdefault' value=''></option>],
            developers: [<option key = 'ddefault' value=''></option>],
            systems: [<option key = 'sdefault' value=''></option>],
            genres: [<option key = 'gdefault' value=''></option>],

            compFade: false,
            nextID: 0,
            subGames: [],
            subGameData: [],
            numSubGames: 1,
        }

        this.resetImageFile = this.resetImageFile.bind(this)
    }

    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        });
    }

    handleSystemChange = e => {
        this.setState({
            system: e.target.value
        });
    }

    handleStatusChange = e => {
        this.setState({
            status: e.target.value
        });
    }

    handlePricePaidChange = e => {
        this.setState({
            pricePaid: e.target.value
        });
    }

    handleRatingChange = e => {
        this.setState({
            rating: e.target.value
        });
    }

    handlePublisherChange = e => {
        this.setState({
            publisher: e.target.value
        });
        document.getElementById('newPublisher').value = ''
    }

    handleNewPubChange = e => {
        this.setState({
            publisher: e.target.value
        });
        document.getElementById('publisher').value = ''
    }

    handleDeveloperChange = e => {
        this.setState({
            developer: e.target.value
        });
        document.getElementById('newDeveloper').value = ''
    }

    handleNewDevChange = e => {
        this.setState({
            developer: e.target.value
        });
        document.getElementById('developer').value = ''
    }

    handleConditionChange = e => {
        this.setState({
            condition: e.target.value
        });
    }

    handleCompletenessChange = e => {
        this.setState({
            completeness: e.target.value
        });
    }

    handleTimePlayedChange = e => {
        this.setState({
            timePlayed: e.target.value
        });
    }

    handleRegionChange = e => {
        this.setState({
            region: e.target.value
        });
    }

    handleOwnershipChange = e => {
        this.setState({
            ownership: e.target.value
        });
    }

    handleNotesChange = e => {
        this.setState({
            notes: e.target.value
        });
    }

    handleNowPlayingChange = e => {
        this.setState({
            nowPlaying: e.target.checked
        });
    }

    handleEAchieveChange = e => {
        this.setState({
            eAcheive: e.target.value
        });
    }

    handleTAchieveChange = e => {
        this.setState({
            tAchieve: e.target.value
        });
    }

    handleOwnedChange = e => {
        this.setState({
            owned: e.target.value
        });
    }

    handleGenre1Change = e => {
        this.setState({
            genre1: e.target.value
        });
    }

    handleGenre2Change = e => {
        this.setState({
            genre2: e.target.value
        });
    }

    handleAcquiredFromChange = e => {
        this.setState({
            acquiredFrom: e.target.value
        });
    }

    handleCompilationChange = e => {
        this.setState({
            compilation: e.target.checked
        });
        if (e.target.checked){
            this.setState({
                compFade: true
            })
        }else{
            this.setState({
                compFade: false
            })
        }
    }

    handleDateAcquiredChange = e => {
        this.setState({
            dateAcq: e.target.value
        });
    }

    handleImgChange = e =>{
        var files = e.target.files;
        for (let i=0;i<files.length; i++){
            let reader = new FileReader();
            let file = files[i];

            reader.onloadend = () => {
                this.setState({
                    img: reader.result
                })
            }
            reader.readAsDataURL(file);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const Upload = async() => {
            await fetch('/send_new_game', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials" : true 
                },
                body:JSON.stringify({
                    title: this.state.title,
                    system: this.state.system,
                    status: this.state.status,
                    pricePaid: this.state.pricePaid,
                    rating: this.state.rating,
                    publisher: this.state.publisher,
                    developer: this.state.developer,
                    condition: this.state.condition,
                    completeness: this.state.completeness,
                    timePlayed: this.state.timePlayed,
                    region: this.state.region,
                    ownership: this.state.ownership,
                    notes: this.state.notes,
                    nowPlaying: this.state.nowPlaying,
                    eAchieve: this.state.eAcheive,
                    tAchieve: this.state.tAchieve,
                    owned: this.state.owned,
                    genre1: this.state.genre1,
                    genre2: this.state.genre2,
                    acquiredFrom: this.state.acquiredFrom,
                    compilation: this.state.compilation,
                    dateAcq: this.state.dateAcq,
                    img: this.state.img.replace('data:image/jpeg;base64,','')
                })
            })
            if (this.state.compilation){
                for (let i=0;i<this.state.numSubGames;i++){
                    await fetch('/send_new_subgame',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            "Access-Control-Allow-Credentials" : true 
                        },
                        body:JSON.stringify({
                            title: this.state.subGameData[i].title,
                            status: this.state.subGameData[i].status,
                            rating: this.state.subGameData[i].rating,
                            notes: this.state.subGameData[i].notes,
                            nowPlaying: this.state.subGameData[i].nowPlaying,
                            image: this.state.subGameData[i].image,
                            parentID: this.state.nextID,
                            gameNumber: i+1
                        })
                    })
                }
            }
        }
        Upload();
        this.props.onAddGame()
        toast("Game added successfully!");
        this.setState({title: '',
        system: '',
        status: '',
        pricePaid: '',
        rating: '',
        publisher: '',
        developer: '',
        condition: '',
        completeness: '',
        timePlayed: '',
        region: '',
        ownership: '',
        notes: '',
        nowPlaying: 0,
        eAcheive: 0,
        tAchieve: 0,
        owned: '',
        genre1: '',
        genre2: '',
        acquiredFrom: '',
        compilation: 0,
        dateAcq: '',
        img: '',})
        this.resetImageFile()
    }

    resetImageFile(){
        let randomString = Math.random().toString(36);

        this.setState({
            imgKey: randomString
        });
    }

    async addSubGameClick(){
        await this.setState(prevState => ({
            numSubGames: prevState.numSubGames + 1,
            subGames: [...prevState.subGames, <div><AddSubGame gameNumber={this.state.numSubGames+1} getData={this.getSubGameData}/></div>],
            subGameData: [...prevState.subGameData, []]
        }))
    }

    async removeSubGameClick(){
        if (this.state.subGames.length > 1){
            this.state.subGames.pop()
            this.state.subGameData.pop()
            await this.setState({
                subGames: this.state.subGames
            })
        }
    }

    getSubGameData = (subGameNum,subGameData) =>{
        let temp = [...this.state.subGameData];
        let item = temp[subGameNum-1]
        item = subGameData
        temp[subGameNum-1] = item
        this.setState({
            subGameData: temp
        });
    }

    componentDidMount(){
        this.onMountOrUpdate()
    }

    componentDidUpdate(prevProps){
        if (this.props.newGame !== prevProps.newGame){
            this.onMountOrUpdate()
        }
    }

    onMountOrUpdate(){
        fetch('/game_options_info', {method: 'GET'}).then(res => res.json()).then(data => {
            var l = data.publishers.length
            var l2 = data.developers.length
            var l3 = data.systems.length
            var l4 = data.genres.length
            for (let i=0;i<l;i++){
                this.setState(prevState => ({
                    publishers: [...prevState.publishers,<option key={data.publishers[i][0]} value={data.publishers[i][0]}>{data.publishers[i][0]}</option>]
                }))
            }
            for (let i=0;i<l2;i++){
                this.setState(prevState => ({
                    developers: [...prevState.developers,<option key={data.developers[i][0]} value={data.developers[i][0]}>{data.developers[i][0]}</option>]
                }))
            }
            for (let i=0;i<l3;i++){
                this.setState(prevState => ({
                    systems: [...prevState.systems,<option key={data.systems[i][0]} value={data.systems[i][0]}>{data.systems[i][0]}</option>]
                }))
            }
            for (let i=0;i<l4;i++){
                this.setState(prevState => ({
                    genres: [...prevState.genres,<option key={data.genres[i][0]} value={data.genres[i][0]}>{data.genres[i][0]}</option>]
                }))
            }
        });
        fetch('/next_game_id', {method: 'GET'}).then(res => res.json()).then(data => {
            this.setState({
                nextID: data.nextID
            })
        });
        //set initial state to one subgame, pass game number as prop
        this.setState({
            subGames:[<div><AddSubGame gameNumber={this.state.numSubGames} getData={this.getSubGameData}/></div>]
        })
    }

    render(){
        return (
            <>
                <div className='addGameBody'>
                    <form onSubmit={this.handleSubmit} method='post'>
                        <div id='gameTitle'>
                            <label htmlFor='title'>Title*:</label><input type='text' id='title' onChange={this.handleTitleChange} required value={this.state.title}></input>
                        </div>
                        <div>
                            <label htmlFor='system'>System*:</label>
                                <select id='system' onChange={this.handleSystemChange} required value={this.state.system}>
                                    {this.state.systems}
                                </select>
                            <CSSTransition in={!this.state.compFade} timeout={200} classNames='fade-in' unmountOnExit>
                                <>
                                <label htmlFor='status'>Status*:</label>
                                    <select id='status' onChange={this.handleStatusChange} required value={this.state.status}>
                                        <option value=''></option>
                                        <option value='Unplayed'>Unplayed</option>
                                        <option value='Unbeaten'>Unbeaten</option>
                                        <option value='Beaten'>Beaten</option>
                                        <option value='Completed'>Completed</option>
                                        <option value='Null'>Null</option>
                                    </select>
                                </>
                            </CSSTransition>
                        </div>
                        <div>
                            <label htmlFor='pricePaid'>Price Paid:</label><input type='number' id='pricePaid' onChange={this.handlePricePaidChange} step='.01' min='0' value={this.state.pricePaid}></input>
                        </div>
                        <div>
                            <CSSTransition in={!this.state.compFade} timeout={200} classNames='fade-in' unmountOnExit>
                                <>
                                <label htmlFor='rating'>Rating:</label><input type='number' id='rating' onChange={this.handleRatingChange} min='0' max='10' step='0.5' value={this.state.rating}></input>
                                </>
                            </CSSTransition>
                        </div>
                        <div>
                            <label htmlFor='publisher'>Publisher:</label>
                                <datalist id='publisher'>
                                    {this.state.publishers}
                                </datalist>
                                <input  autoComplete="on" list="publisher" onChange={this.handlePublisherChange} value={this.state.publisher}/>
                            <label htmlFor='newPublisher'>New Publisher:</label><input type='text' id='newPublisher' onChange={this.handleNewPubChange} value={this.state.publisher}></input>
                        </div>
                        <div>
                            <label htmlFor='developer'>Developer:</label>
                                    <datalist id='developer'>
                                        {this.state.developers}
                                    </datalist>   
                                    <input  autoComplete="on" list="developer" onChange={this.handleDeveloperChange} value={this.state.developer}/>
                            <label htmlFor='newDeveloper'>New Developer:</label><input type='text' id='newDeveloper' onChange={this.handleNewDevChange} value={this.state.developer}></input>
                        </div>
                        <div>
                            <label htmlFor='condition'>Condition:</label>
                                <select id='condition' onChange={this.handleConditionChange} value={this.state.condition}>
                                    <option value=''></option>
                                    <option value='New'>New</option>
                                    <option value='Like New'>Like New</option>
                                    <option value='Very Good'>Very Good</option>
                                    <option value='Good'>Good</option>
                                    <option value='Acceptable'>Acceptable</option>
                                    <option value='Bad'>Bad</option>
                                    <option value='NA'>NA</option>
                                </select> 
                            <label htmlFor='completeness'>Completeness:</label>
                                <select id='completeness' onChange={this.handleCompletenessChange} value={this.state.completeness}>
                                    <option value=''></option>
                                    <option value='New'>New</option>
                                    <option value='Complete'>Complete</option>
                                    <option value='Game + Case/Box'>Game + Case/Box</option>
                                    <option value='Game + Manual'>Game + Manual</option>
                                    <option value='Game Only'>Game Only</option>
                                    <option value='Case/Box Only'>Case/Box Only</option>
                                    <option value='Manual Only'>Manual Only</option>
                                    <option value='Manual + Case/Box'>Manual + Case/Box</option>
                                    <option value='NA'>NA</option>
                                </select> 
                        </div>
                        <div>
                            <label htmlFor='timePlayed'>Time Played:</label><input type='number' id='timePlayed' onChange={this.handleTimePlayedChange} min='0' value={this.state.timePlayed}></input>
                        </div>
                        <div>
                            <label htmlFor='region'>Region:</label>
                            <select id='region' onChange={this.handleRegionChange} value={this.state.region}>
                                    <option value=''></option>
                                    <option value='NTSC-U'>NTSC-U (Americas)</option>
                                    <option value='PAL'>PAL (Europe)</option>
                                    <option value='NTSC-J'>NTSC-J (Japan)</option>
                                    <option value='NTSC-C'>NTSC-C (China)</option>
                                    <option value='Other'>Other</option>
                                </select>
                            <label htmlFor='ownership'>Ownership:</label>
                                <select id='ownership' onChange={this.handleOwnershipChange} value={this.state.ownership}>
                                    <option value=''></option>
                                    <option value='Owned'>Owned</option>
                                    <option value='Household'>Household</option>
                                    <option value='Borrowed/Rented'>Borrowed/Rented</option>
                                    <option value='Other'>Other</option>
                                </select>
                            <label htmlFor='numOwned'>Number Owned:</label><input type='number' id='numOwned' onChange={this.handleOwnedChange}min='0' value={this.state.owned}></input>
                        </div>
                        <div>
                            <label htmlFor='notes'>Notes:</label><input type='text' id='notes' onChange={this.handleNotesChange} value={this.state.notes}></input>
                        </div>
                        <div>
                            <CSSTransition in={!this.state.compFade} timeout={200} classNames='fade-in' unmountOnExit>
                                <>
                                    <label htmlFor='nowPlaying'>Now Playing?</label>
                                    <input type='checkbox' id='nowPlaying' onChange={this.handleNowPlayingChange} checked={this.state.nowPlaying}></input>
                                </>
                            </CSSTransition>
                        </div>
                        <div>
                            <label htmlFor='eAchieve'>Earned Achievements:</label><input type='number' id='eAchieve' onChange={this.handleEAchieveChange} min='0' value={this.state.eAcheive}></input>
                            <label htmlFor='tAchieve'>Total Achievements:</label><input type='number' id='tAchieve' onChange={this.handleTAchieveChange} min='0' value={this.state.tAchieve}></input>
                        </div>
                        <div>
                            <label htmlFor='genre1'>Genre 1:</label>
                                <select id='genre1' onChange={this.handleGenre1Change} value={this.state.genre1}>
                                    {this.state.genres}
                                </select>
                            <label htmlFor='genre2'>Genre 2:</label>
                                <select id='genre2' onChange={this.handleGenre2Change} value={this.state.genre2}>
                                    {this.state.genres}
                                </select>
                        </div>
                        <div>
                            <label htmlFor='acquiredFrom'>Acquired From:</label><input type='text' id='acquiredFrom' onChange={this.handleAcquiredFromChange} value={this.state.acquiredFrom}></input>
                            <label htmlFor='dateAcq'>Date Acquired:</label><input type='date' id='dateAcq' onChange={this.handleDateAcquiredChange} value={this.state.dateAcq}></input>
                        </div>
                        <div>
                            <label htmlFor='compilation'>Compilation?</label><input type='checkbox' id='compilation' onChange={this.handleCompilationChange} checked={this.state.compilation}></input>
                        </div>
                        <div>
                            <label htmlFor='image'>Image:</label><input type='file' id='image' onChange={this.handleImgChange} key={this.state.imgKey || ''}></input>
                        </div>
                        <CSSTransition in={this.state.compFade} timeout={200} classNames='fade-in' unmountOnExit>
                            <>
                            <div>
                                <button type='button' onClick={this.addSubGameClick}>Add Sub-Game</button>
                                <button type='button' onClick={this.removeSubGameClick}>Remove Sub-Game</button> 
                            </div>
                            </>
                        </CSSTransition>
                        <CSSTransition id='subgames' in={this.state.compFade} timeout={200} classNames='fade-in' unmountOnExit>
                            <>
                            {this.state.subGames}
                            </>
                        </CSSTransition>
                        <div>
                            <input id='submit' type='submit'></input>
                        </div>
                    </form>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={2500}
                        hideProgressBar={true}
                        closeOnClick={true}
                        draggable={false}
                        theme={'dark'}
                    />
                </div>
            </>
        );
    }   
}

export default AddGame;