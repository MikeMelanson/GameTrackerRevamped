import React from 'react';

//import "../css/addeditdelete.css";

class AddSystem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            format: '',
            publisher: '',
            pricePaid: '',
            ownership: '',
            owned: '',
            numCont: '',
            region: '',
            notes: '',
            dateAcq: '',
            img: '',
            publishers: [<option value=''></option>]
        }
    }

    handleNameChange = e => {
        this.setState({
            name: e.target.value
        });
    }

    handleFormatChange = e => {
        this.setState({
            format: e.target.value
        });
    }

    handlePublisherChange = e => {
        this.setState({
            publisher: e.target.value
        });
    }

    handlePricePaidChange = e => {
        this.setState({
            pricePaid: e.target.value
        });
    }

    handleOwnershipChange = e => {
        this.setState({
            ownership: e.target.value
        });
    }

    handleOwnedChange = e => {
        this.setState({
            owned: e.target.value
        });
    }

    handleNumContChange = e => {
        this.setState({
            numCont: e.target.value
        });
    }

    handleRegionChange = e => {
        this.setState({
            region: e.target.value
        });
    }

    handleNotesChange = e => {
        this.setState({
            notes: e.target.value
        });
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
            await fetch('/send_new_system', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials" : true 
                },
                body:JSON.stringify({
                    name: this.state.name,
                    format: this.state.format,
                    publisher: this.state.publisher,
                    pricePaid: this.state.pricePaid,
                    ownership: this.state.ownership,
                    owned: this.state.owned,
                    numCont: this.state.numCont,
                    region: this.state.region,
                    notes: this.state.notes,
                    dateAcq: this.state.dateAcq,
                    img: this.state.img.replace('data:image/jpeg;base64,','')
                })
            }).then(res => res.text()).then(data => {
                console.log("Testing")
            });
        }
        Upload();
        //callback to parent passing system name in order to update navbar
        this.props.onAddSystem(this.state.name)
    }

    componentDidMount(){
        fetch('/system_publishers', {method: 'GET'}).then(res => res.json()).then(data => {
            var l = data.publishers.length
            for (let i=0;i<l;i++){
                this.setState(prevState => ({
                    publishers: [...prevState.publishers,<option key={data.publishers[i][0]} value={data.publishers[i][0]}>{data.publishers[i][0]}</option>]
                }))
            }
        });
    }

    render(){
        return (
            <>
                <div>
                    Add System
                    <form onSubmit={this.handleSubmit} method='post'>
                        <label htmlFor='name'>Name*:</label><input type='text' id='name' onChange={this.handleNameChange} required></input>
                        <label htmlFor='image'>Image:</label><input type='file' id='image' onChange={this.handleImgChange}></input>
                        <label htmlFor='format'>Format:</label>
                            <select id='format' onChange={this.handleFormatChange} value="">
                                <option value=''></option>
                                <option value='Cartridge'>Cartridge</option>
                                <option value='Disc'>Disc</option>
                                <option value='Digital/Download'>Digital/Download</option>
                                <option value='Other'>Other</option>
                            </select>
                        <label htmlFor='publisher'>Publisher:</label>
                            <select id='publisher' onChange={this.handlePublisherChange}>
                                {this.state.publishers}
                            </select>
                        <label htmlFor='pricePaid'>Price Paid:</label><input type='number' id='pricePaid' onChange={this.handlePricePaidChange} step='.01' min='0'></input>
                        <label htmlFor='ownership'>Ownership:</label>
                            <select id='ownership' onChange={this.handleOwnershipChange}>
                                <option value=''></option>
                                <option value='Owned'>Owned</option>
                                <option value='Household'>Household</option>
                                <option value='Borrowed/Rented'>Borrowed/Rented</option>
                                <option value='Other'>Other</option>
                            </select>
                        <label htmlFor='numOwned'>Number Owned:</label><input type='number' id='numOwned' onChange={this.handleOwnedChange}min='0'></input>
                        <label htmlFor='numCont'>Number of Controllers:</label><input type='number' id='numCont' onChange={this.handleNumContChange}min='0'></input>
                        <label htmlFor='region'>Region:</label>
                        <select id='region' onChange={this.handleRegionChange}>
                                <option value=''></option>
                                <option value='NTSC-U'>NTSC-U (Americas)</option>
                                <option value='PAL'>PAL (Europe)</option>
                                <option value='NTSC-J'>NTSC-J (Japan)</option>
                                <option value='NTSC-C'>NTSC-C (China)</option>
                                <option value='Other'>Other</option>
                            </select>
                        <label htmlFor='notes'>Notes:</label><input type='text' id='notes' onChange={this.handleNotesChange}></input>
                        <label htmlFor='dateAcq'>Date Acquired:</label><input type='date' id='dateAcq' onChange={this.handleDateAcquiredChange}></input>
                        <input type='submit'></input>
                    </form>
                </div>
            </>
        );
    }   
}

export default AddSystem;