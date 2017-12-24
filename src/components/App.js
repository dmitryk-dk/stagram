import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivatRoute';
import {observer} from 'mobx-react';
import getStore from '../store/store';

const App = () => (
    <div className={'container-fluid'}>
        <div className={'row'}>
            <div className={'col-sm-12'}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <PrivateRoute path="/" authed={getStore().isAuthed} component={Main}/>
                </Switch>
            </div>
        </div>
    </div>
);

export default withRouter(observer(App));
