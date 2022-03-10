import React from 'react';

import "../css/addgame.css";
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class EditGame extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            status: '',
            rating: '',
            notes: '',
            nowPlaying: false,
           
            ID: 0,
            parentID: 0,
            gameNum: 0
        }
    }

    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        });
    }

    handleStatusChange = e => {
        this.setState({
            status: e.target.value
        });
    }

    handleRatingChange = e => {
        this.setState({
            rating: e.target.value
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

    handleSubmit = (e) => {
        e.preventDefault()
        var dbody;
        dbody={ID: this.state.ID,
                title: this.state.title,
                status: this.state.status,
                rating: this.state.rating,
                notes: this.state.notes,
                nowPlaying: this.state.nowPlaying,
            }

        const Update = async() => {
            await fetch('/update_sub_game', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials" : true 
                },
                body:JSON.stringify(dbody)
            })
        }
        Update();
        this.props.onChange(1)
        this.props.history.goBack();
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
        var info = this.props.location.state.info;

        console.log(this.props.location.state.info)

        this.setState({
            ID: info[0],
            parentID: info[1],
            gameNum: info[2],
            title: info[3],
            status: info[4],
            rating: info[5],
            notes: info[6],
            nowPlaying: info[7],
        })
    }

    render(){
        return (
            <>
                <div className='addGameBody'>
                    <form onSubmit={this.handleSubmit} method='post'>
                        <div className='outline'>
                            <div>
                                <label htmlFor='title'>Title*:</label><input type='text' id='title' onChange={this.handleTitleChange} required value={this.state.title}></input>
                            </div>
                            <div>
                                <label htmlFor='status'>Status*:</label>
                                    <select id='status' onChange={this.handleStatusChange} required value={this.state.status}>
                                        <option value=''></option>
                                        <option value='Unplayed'>Unplayed</option>
                                        <option value='Unbeaten'>Unbeaten</option>
                                        <option value='Beaten'>Beaten</option>
                                        <option value='Completed'>Completed</option>
                                        <option value='Null'>Null</option>
                                    </select>
                            </div>
                        </div>
                        <div className='outline'>
                            <div>
                                <label htmlFor='rating'>Rating:</label><input type='number' id='rating' onChange={this.handleRatingChange} min='0' max='10' step='0.5' value={this.state.rating}></input>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='notes'>Notes:</label><input type='text' id='notes' onChange={this.handleNotesChange} value={this.state.notes}></input>
                        </div>
                        <div>
                            <label htmlFor='nowPlaying'>Now Playing?</label>
                            <input type='checkbox' id='nowPlaying' onChange={this.handleNowPlayingChange} checked={this.state.nowPlaying}></input>
                        </div>
                        <div>
                            <input id='submit' type='submit'></input>
                            <button id='cancel' type='button' onClick={this.props.history.goBack}>Cancel</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }   
}

export default withRouter(EditGame);