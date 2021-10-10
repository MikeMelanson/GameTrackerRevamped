import React from "react";

//import "../css/addsubgame.css";

class AddSubGame extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            status: '',
            rating: 0,
            notes: '',
            nowPlaying: false,
            image: '',
            //gamenumber should be raised to parent
            //gameNumber: 1
        }
    }

    handleTitleChange = async e => {
        await this.setState({
            title: e.target.value
        });
        this.props.getData(this.props.gameNumber,this.state)
    }

    handleStatusChange = async e =>{
        await this.setState({
            status: e.target.value
        });
        this.props.getData(this.props.gameNumber,this.state)
    }

    handleRatingChange = async e => {
        await this.setState({
            rating: e.target.value
        });
        this.props.getData(this.props.gameNumber,this.state)
    }

    handleNotesChange = async e => {
        await this.setState({
            notes: e.target.value
        });
        this.props.getData(this.props.gameNumber,this.state)
    }

    handleNowPlayingChange = async e => {
        await this.setState({
            nowPlaying: e.target.value
        });
        this.props.getData(this.props.gameNumber,this.state)
    }

    handleImgChange = e =>{
        var files = e.target.files;
        for (let i=0;i<files.length; i++){
            let reader = new FileReader();
            let file = files[i];

            reader.onloadend = async () => {
                await this.setState({
                    img: reader.result
                })
            }
            reader.readAsDataURL(file);
        }
        this.props.getData(this.props.gameNumber,this.state)
    }

    render(){
        return(
            <>
                <div>
                    <label htmlFor='title'>Title*:</label><input type='text' id='title' onChange={this.handleTitleChange} required></input>
                    <label htmlFor='status'>Status:</label>
                        <select id='status' onChange={this.handleStatusChange} required>
                            <option value=''></option>
                            <option value='Unplayed'>Unplayed</option>
                            <option value='Unbeaten'>Unbeaten</option>
                            <option value='Beaten'>Beaten</option>
                            <option value='Completed'>Completed</option>
                            <option value='Null'>Null</option>
                        </select>
                    <label htmlFor='rating'>Rating:</label><input type='number' id='rating' onChange={this.handleRatingChange} min='0' max='10' step='0.5'></input>
                    <label htmlFor='notes'>Notes:</label><input type='text' id='notes' onChange={this.handleNotesChange}></input>
                    <label htmlFor='nowPlaying'>Now Playing?</label><input type='checkbox' id='nowPlaying' onChange={this.handleNowPlayingChange}></input>
                    <label htmlFor='image'>Image:</label><input type='file' id='image' onChange={this.handleImgChange}></input>
                </div>
            </>
        );
    }
}

export default AddSubGame;