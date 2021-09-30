import React from "react";
import AddSystem from "./AddSystem";
import AddHome from "./AddHome";
import {Route, Switch, withRouter} from "react-router-dom";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Add extends React.Component{

    render(){
        return(
            <>
                <div>
                    <Route render={ ({location}) =>
                        (
                            <TransitionGroup>
                                <CSSTransition timeout={800}
                                    classNames='pageSlider'
                                    key={location.key}
                                    mountOnEnter={true}
                                    unmountOnExit={true}
                                    appear={false}
                                    in={false}>
                                    <Switch location={location}>
                                        <Route path="/Add"><div><AddHome /></div></Route>
                                        <Route exact path="/AddSys"><div><AddSystem /></div></Route>
                                        <Route exact path="/AddGame"><div>Hello</div></Route>
                                    </Switch>
                                </CSSTransition>
                                </TransitionGroup>
                        )
                    }/>
                </div>
            </>
        );
    }
}

export default Add;