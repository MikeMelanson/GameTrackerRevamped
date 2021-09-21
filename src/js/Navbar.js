import logo from '../img/controller.png';
import React from "react";
import {FaHome,FaPlus,FaFileImport,FaInfo,FaHandsHelping,FaHistory,} from 'react-icons/fa';
import {GiGameConsole,GiCalendar,GiChecklist} from 'react-icons/gi';
import {AiOutlinePercentage,AiFillSetting} from 'react-icons/ai';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import {Link} from 'react-router-dom'

import "react-pro-sidebar/dist/css/styles.css";
import "../css/navbar.css";

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            navbarCollapse: true,
            homeActive: true,
            statsActive: false,
            memoryActive: false,
            plannerActive: false,
            wishlistActive: false,
            addActive: false,
            importActive: false,
            optionsActive: false,
            helpActive: false,
            aboutActive: false,
            systemsList: [],
            systemsActive: [],
        }
    }

    updateSystemsActive(system){
        this.setState(previousState=>{
          return{
            systemsActive: [...previousState.systemsActive, {[system]: false}]
          };
        });
    }

    componentDidMount(){
        fetch('/systems').then(res => res.json()).then(data => {
          var systems = data.systems;
          this.setState({systemsList:systems});
          var system='';
          for (let i=0;i<systems.length;i++){
            system=systems[i][0];
            this.updateSystemsActive(system)
          }
        });
    }

    setNavbarCollapse(bool){
        this.setState({navbarCollapse: bool});
    }

    setActive(menuItemClicked,system=''){
        var activeKey;
        for (const key in this.state){
          if (this.state[key] === true){
            // eslint-disable-next-line
            activeKey = key; 
            break;
          }
        }
        if (activeKey == null){
            const newSystemsActive = this.state.systemsActive.slice();
            for (let i=0;i<this.state.systemsActive.length;i++){
                var s = Object.keys(this.state.systemsActive[i])
                var value = Object.values(this.state.systemsActive[i])[0]
                if (value === true){
                    newSystemsActive[i] = {[s]: false}
                    break;
                }
            }
            this.setState({systemsActive: newSystemsActive})
        }
        switch(menuItemClicked){
          case 'home':
            this.setState({
              [activeKey]: false,
              homeActive: true,
            });
            break;
          case 'stats':
            this.setState({
              [activeKey]: false,
              statsActive:true,
            });
            break;
          case 'memory':
            this.setState({
              [activeKey]: false,
              memoryActive:true,
            });
            break;
          case 'planner':
            this.setState({
              [activeKey]: false,
              plannerActive:true,
            });
            break;
          case 'wish':
            this.setState({
              [activeKey]: false,
              wishlistActive:true,
            });
            break;
          case 'add':
            this.setState({
              [activeKey]: false,
              addActive:true,
            });
            break;
          case 'import':
            this.setState({
              [activeKey]: false,
              importActive:true,
            });
            break;
          case 'options':
            this.setState({
              [activeKey]: false,
              optionsActive:true,
            });
            break;
          case 'help':
            this.setState({
              [activeKey]: false,
              helpActive:true,
            });
            break;
          case 'about':
            this.setState({
              [activeKey]: false,
              aboutActive:true,
            });
            break;
          case 'system':
            const newSystemsActive = this.state.systemsActive.slice();
            const systems = Object.entries(newSystemsActive).map(([key,value])=>{
              return Object.entries(value).map(([key2,value2])=>{return key2})
            })
            for (let i=0;i<newSystemsActive.length;i++){
              if (newSystemsActive[i][systems[i]] === true){
                newSystemsActive[i]= {[systems[i]]:false};
              }
              if (newSystemsActive[i][system] === false){
                newSystemsActive[i] = {[system]: true};
              }
            }
            this.setState({
              [activeKey]:false,
              systemsActive: newSystemsActive
            })
            break;
          default:
            this.setState({
              homeActive: true,
              statsActive: false,
              memoryActive: false,
              plannerActive: false,
              wishlistActive: false,
              addActive: false,
              importActive: false,
              optionsActive: false,
              helpActive: false,
              aboutActive: false,
            })
        }
    }

    navbarMouseOver = () => {this.setNavbarCollapse(false);};
    navbarMouseLeave = () => {this.setNavbarCollapse(true);};

    render(){
        var systems = []
        if ((this.state.systemsActive.length === this.state.systemsList.length) && this.state.systemsActive.length > 0){
            for (let i= 0; i < this.state.systemsList.length;i++){
                systems.push(<MenuItem key={this.state.systemsList[i][0]} active={Object.values(this.state.systemsActive[i])[0]}
                    onClick={() => this.setActive('system',this.state.systemsList[i][0])}>
                      <Link to={{pathname:'/System', state:{system:this.state.systemsList[i][0]}}}>{this.state.systemsList[i][0]}</Link></MenuItem>);
            }
        } 
        return (
            <>
                <div id='navbar'>
                    <ProSidebar collapsed={this.state.navbarCollapse} onMouseOver={this.navbarMouseOver} onMouseLeave={this.navbarMouseLeave}>
                        <SidebarHeader className="sHeader">
                            <div className='logotext'>
                                <img src={logo} className="controller-logo" alt="logo" />
                                <p>{this.state.navbarCollapse ? '' : 'Game On!'}</p>
                            </div>
                        </SidebarHeader>
                        <SidebarContent>
                            <Menu iconShape='square'>
                                <MenuItem 
                                    active={this.state.homeActive} 
                                    icon={<FaHome size={28}/>} 
                                    onClick={() => this.setActive('home')}><Link to='/Home'>Home</Link></MenuItem>
                                <SubMenu title="Systems" icon={<GiGameConsole size={28}/>}>Systems
                                    {systems}
                                </SubMenu>
                                <MenuItem 
                                    active={this.state.statsActive} 
                                    icon={<AiOutlinePercentage size={28}/>}
                                    onClick={() => this.setActive('stats')}><Link to='/DS'>Detailed Statistics</Link></MenuItem>
                                <MenuItem 
                                    active={this.state.memoryActive} 
                                    icon={<FaHistory size={28}/>}
                                    onClick={() => this.setActive('memory')}><Link to='/Mem'>Memory Card</Link></MenuItem>
                                <MenuItem 
                                    active={this.state.plannerActive}
                                    icon={<GiCalendar size={28}/>}
                                    onClick={() => this.setActive('planner')}><Link to='/Plan'>Planner</Link></MenuItem>
                                <MenuItem 
                                    active={this.state.wishlistActive}
                                    icon={<GiChecklist size={28}/>}
                                    onClick={() => this.setActive('wish')}><Link to='/Wish'>Wishlist</Link></MenuItem>
                                <MenuItem 
                                    active={this.state.addActive}
                                    icon={<FaPlus size={28}/>}
                                    onClick={() => this.setActive('add')}><Link to='/Add'>Add/Edit/Delete</Link></MenuItem>
                                <MenuItem 
                                    active={this.state.importActive}
                                    icon={<FaFileImport size={28}/>}
                                    onClick={() => this.setActive('import')}><Link to='/Imp'>Import Data</Link></MenuItem>
                                <MenuItem 
                                    active={this.state.optionsActive}
                                    icon={<AiFillSetting size={28}/>}
                                    onClick={() => this.setActive('options')}><Link to='/Set'>Settings</Link></MenuItem>
                                <MenuItem
                                    active={this.state.helpActive} 
                                    icon={<FaHandsHelping size={28}/>}
                                    onClick={() => this.setActive('help')}><Link to='/Help'>Help</Link></MenuItem>
                                <MenuItem 
                                    active={this.state.aboutActive}
                                    icon={<FaInfo size={28}/>}
                                    onClick={() => this.setActive('about')}><Link to='/Abo'>About</Link></MenuItem>
                            </Menu>
                        </SidebarContent>
                        <SidebarFooter>
                            <Menu iconShape='square'>
                                <MenuItem icon={<FaHome size={28}/>}>Logout</MenuItem>
                            </Menu>
                        </SidebarFooter>
                    </ProSidebar>
                </div>
            </>
        );
        }
}

export default Navbar;