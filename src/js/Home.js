import logo from '../img/controller.png';
import React from "react";
import {FaHome,FaPlus,FaFileImport,FaInfo,FaHandsHelping,FaHistory,} from 'react-icons/fa';
import {GiGameConsole,GiCalendar,GiChecklist} from 'react-icons/gi';
import {AiOutlinePercentage,AiFillSetting} from 'react-icons/ai';

import "../css/home.css";

class Home extends React.Component{
    constructor(props){
        super(props);
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
                        <div className='game_total'>Games Total: 0</div>
                        <div className='system_total'>Systems Total: 0</div>
                    </div>
                    <div className='div'>
                        <div className='border'></div>
                    </div>
                    <div className='overview'>
                        <div className='o1'>
                            <div className='home_overview'><p><FaHome size={30}/>The Home module is where you are now.</p></div>
                            <div className='add_overview'><p><FaPlus size={60}/>The Add/Edit/Delete module allows you to add games/systems, edit them, or delete them.</p></div>
                        </div>
                        <div className='o2'>
                            <div className='systems_overview'><p><GiGameConsole size={50}/>The Systems module is where you view details on systems and games.</p></div>
                            <div className='import_overview'><p><FaFileImport size={50}/>The Import module allows you to import data from another source.</p></div>
                        </div>
                        <div className='o3'>
                            <div className='detailed_overview'><p><AiOutlinePercentage size={50}/>The Detailed Statistics module shows you in depth stats about your collection.</p></div>
                            <div className='options_overview'><p><AiFillSetting size={50}/>The Options module lets you set options to customize your experience.</p></div>
                        </div>
                        <div className='o4'>
                            <div className='memory_overview'><p><FaHistory size={50}/>The Memory Card module shows you recently added games and your added/beaten stats.</p></div>
                            <div className='help_overview'><p><FaHandsHelping size={50}/>The help module goes over the other modules in much more detail. Got a question? Head here!</p></div>
                        </div>
                        <div className='o5'>
                            <div className='planner_overview'><p><GiCalendar size={50}/>The Planner module allows you to plan out your future gaming.</p></div>
                            <div className='about_overview'><p><FaInfo size={30}/>Info about the software can be found here.</p></div>
                        </div>
                        <div className='o6'>
                            <div className='wishlist_overview'><p><GiChecklist size={50}/>The wishlist module allows you to track games and systems you want to acquire.</p></div>
                            <div className='temp'><p><FaHome size={30}/>TEMP DESCRIPTOR</p></div>
                        </div>
                    </div>
                </div>
            </>
        );
        }
}

export default Home;