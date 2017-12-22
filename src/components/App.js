import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Main from './Main';
import Single from './SingleFrame.js';
import PhotoGrid from './PhotoGrid.js';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute from './PrivatRoute';
import {observer} from 'mobx-react';

const App = () => (
    <div className={'container-fluid'}>
        <div className={'row'}>
            <div className={'col-sm-12'}>
                <Switch>
                    <Route exact path="/posts" component={PhotoGrid} />
                    <Route exact path="/view/:postId" component={Single} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute path="/" authed={false} component={Main}/>
                </Switch>
            </div>
        </div>
    </div>
);

export default withRouter(observer(App));
