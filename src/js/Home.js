import logo from '../img/controller.png';
import React from "react";
import {FaHome,FaPlus,FaFileImport,FaInfo,FaHandsHelping,FaHistory,} from 'react-icons/fa';
import {GiGameConsole,GiCalendar,GiChecklist} from 'react-icons/gi';
import {AiOutlinePercentage,AiFillSetting} from 'react-icons/ai';

import "../css/home.css";

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            totalGames: 0,
            totalSystems: 0,
        }

        fetch('/systems_total').then(res => res.json()).then(data => {
            var stotal = data.total
            this.setState({totalSystems:stotal});
        });

        fetch('/games_total').then(res => res.json()).then(data => {
            var gtotal = data.total
            this.setState({totalGames:gtotal});
        });
    }

    render(){
        return (
            <>
                <div id='home'>
                    <div className='welcome'>
                        <img src={logo} className="welcome_logo" alt="logo" />
                        <div className='welcome_main'>
                            Welcome to Game Tracker
                        </div>
                        <div className='welcome_sub'>
                            The best way to track and manage your game collection
                        </div>
                    </div>
                    <div className='div'>
                        <div className='border'></div>
                    </div>
                    <div className='totals'>
                        <div className='game_total'>Games Total: {this.state.totalGames}</div>
                        <div className='system_total'>Systems Total: {this.state.totalSystems}</div>
                    </div>
                    <div className='div'>
                        <div className='border'></div>
                    </div>
                    <div className='overview'>
                        <div className='o1'>
                            <div><p><FaHome className='icon' size={30}/>The Home screen is where you are now.</p></div>
                            <div><p><FaPlus className='icon' size={60}/>Add/Edit/Delete allows you to add games/systems, edit them, or delete them.</p></div>
                        </div>
                        <div className='o1'>
                            <div><p><GiGameConsole className='icon' size={50}/>The Systems module is where you view details on systems and games.</p></div>
                            <div><p><FaFileImport className='icon' size={50}/>The Import module allows you to import data from another source.</p></div>
                        </div>
                        <div className='o1'>
                            <div><p><AiOutlinePercentage className='icon' size={50}/>The Detailed Statistics module shows you in depth stats about your collection.</p></div>
                            <div><p><AiFillSetting className='icon' size={50}/>The Options module lets you set options to customize your experience.</p></div>
                        </div>
                        <div className='o1'>
                            <div><p><FaHistory className='icon' size={50}/>The Memory Card module shows you recently added games and your added/beaten stats.</p></div>
                            <div><p><FaHandsHelping className='icon' size={50}/>The help module goes over the other modules in much more detail. Got a question? Head here!</p></div>
                        </div>
                        <div className='o1'>
                            <div><p><GiCalendar className='icon' size={50}/>The Planner module allows you to plan out your future gaming.</p></div>
                            <div><p><FaInfo className='icon' size={30}/>Info about the software can be found here.</p></div>
                        </div>
                        <div className='o1'>
                            <div><p><GiChecklist className='icon' size={50}/>The wishlist module allows you to track games and systems you want to acquire.</p></div>
                            <div><p><FaHome className='icon' size={30}/>TEMP DESCRIPTOR</p></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;