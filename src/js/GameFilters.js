import React from 'react';

import "../css/gamefilters.css";

/*
TODO

-add verification for min/max price/ratings
*/

class GameFilters extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            publishers: [<option key = 'pdefault' value=''></option>],
            developers: [<option key = 'ddefault' value=''></option>],
            genres: [<option key = 'gdefault' value=''></option>],

            status: '',
            publisher: '',
            developer: '',
            condition: '',
            completeness: '',
            region: '',
            ownership: '',
            genre1: '',
            genre2: '',
            pricePaid1: '',
            pricePaid2: '',
            rating1: '',
            rating2: '',

        }
        this.logSubmit = this.logSubmit.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    logSubmit(event){
        event.preventDefault();
        if (event.submitter.name === 'clear'){
            this.props.getFilters('clear')
        }
        else{
            var filters = [{'status':this.state.status,'publisher':this.state.publisher,'developer':this.state.developer
                            ,'condition':this.state.condition,'completeness':this.state.completeness,'region':this.state.region
                            ,'ownership':this.state.ownership,'genre1':this.state.genre1,'genre2':this.state.genre2,'pricePaid1':this.state.pricePaid1
                            ,'pricePaid2':this.state.pricePaid2,'rating1':this.state.rating1,'rating2':this.state.rating2}]
            this.props.getFilters(filters)
        }
    }

    handleFilterChange(event){
        switch(event.target.id){
            case 'status':
                this.setState({status:event.target.value});
                break;
            case 'pubIn':
                this.setState({publisher:event.target.value});
                break;  
            case 'devIn':
                this.setState({developer:event.target.value});
                break;  
            case 'condition':
                this.setState({condition:event.target.value});
                break;
            case 'completeness':
                this.setState({completeness:event.target.value});
                break;
            case 'region':
                this.setState({region:event.target.value});
                break;
            case 'ownership':
                this.setState({ownership:event.target.value});
                break;
            case 'genre1':
                this.setState({genre1:event.target.value});
                break;
            case 'genre2':
                this.setState({genre2:event.target.value});
                break;
            case 'pricePaid1':
                this.setState({pricePaid1:event.target.value});
                break;
            case 'pricePaid2':
                this.setState({pricePaid2:event.target.value});
                break;
            case 'rating1':
                this.setState({rating1:event.target.value});
                break;
            case 'rating2':
                this.setState({rating2:event.target.value});
                break;
            default:
                break;
        }
    }
    
    componentDidMount(){
        fetch('/game_options_info', {method: 'GET'}).then(res => res.json()).then(data => {
            var l = data.publishers.length
            var l2 = data.developers.length
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
            for (let i=0;i<l4;i++){
                this.setState(prevState => ({
                    genres: [...prevState.genres,<option key={data.genres[i][0]} value={data.genres[i][0]}>{data.genres[i][0]}</option>]
                }))
            }
        });
    }

    render(){
        const form = document.getElementById('form');
        if (form){
            form.addEventListener('submit',this.logSubmit);
        }
        return (
            <>
                <div className='filterTitle'>Filters</div>
                <form className='filtersForm' id='form'>
                    <label htmlFor='status'>Status:</label>
                        <select id='status' onChange={this.handleFilterChange}>
                            <option value=''></option>
                            <option value='Unplayed'>Unplayed</option>
                            <option value='Unbeaten'>Unbeaten</option>
                            <option value='Beaten'>Beaten</option>
                            <option value='Completed'>Completed</option>
                            <option value='Null'>Null</option>
                        </select>
                    <label htmlFor='publisher'>Publisher:</label>
                        <datalist id='publisher' >
                            {this.state.publishers}
                        </datalist>
                        <input id='pubIn' autoComplete="on" list="publisher" onChange={this.handleFilterChange}/>
                    <label htmlFor='developer'>Developer:</label>
                        <datalist id='developer'>
                            {this.state.developers}
                        </datalist>   
                        <input id='devIn' autoComplete="on" list="developer" onChange={this.handleFilterChange}/>
                    <label htmlFor='condition'>Condition:</label>
                        <select id='condition' onChange={this.handleFilterChange}>
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
                        <select id='completeness' onChange={this.handleFilterChange}>
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
                    <label htmlFor='region'>Region:</label>
                        <select id='region' onChange={this.handleFilterChange}>
                                <option value=''></option>
                                <option value='NTSC-U'>NTSC-U (Americas)</option>
                                <option value='PAL'>PAL (Europe)</option>
                                <option value='NTSC-J'>NTSC-J (Japan)</option>
                                <option value='NTSC-C'>NTSC-C (China)</option>
                                <option value='Other'>Other</option>
                        </select>
                    <label htmlFor='ownership'>Ownership:</label>
                        <select id='ownership' onChange={this.handleFilterChange}>
                            <option value=''></option>
                            <option value='Owned'>Owned</option>
                            <option value='Household'>Household</option>
                            <option value='Borrowed/Rented'>Borrowed/Rented</option>
                            <option value='Other'>Other</option>
                        </select>
                    <label htmlFor='genre1'>Genre 1:</label>
                        <select id='genre1' onChange={this.handleFilterChange}>
                            {this.state.genres}
                        </select>
                    <label htmlFor='genre2'>Genre 2:</label>
                        <select id='genre2' onChange={this.handleFilterChange}>
                            {this.state.genres}
                        </select>
                    <label htmlFor='pricePaid1'>Price Paid: Min</label>
                        <input type='number' id='pricePaid1' onChange={this.handleFilterChange} min='0' step='0.01'></input>
                    <label htmlFor='pricePaid2'>Price Paid: Max</label>
                        <input type='number' id='pricePaid2' onChange={this.handleFilterChange} min='0' step='0.01'></input>
                    <label htmlFor='rating1'>Rating: Min</label>
                        <input type='number' id='rating1' onChange={this.handleFilterChange} min='0' step='0.5'></input>
                    <label htmlFor='rating2'>Rating: Max</label>
                        <input type='number' id='rating2' onChange={this.handleFilterChange} min='0' step='0.5'></input>
                    <input type='submit' value="Apply Filter" name='apply'></input>
                    <input type='submit' value="Clear Filter" name='clear'></input>
                </form>    
            </>
        );
    }   
}

export default GameFilters;