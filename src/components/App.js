import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import PrivateRoute from './PrivatRoute';
import {observer} from 'mobx-react';

const App = () => (
    <div className={'container-fluid'}>
        <div className={'row'}>
            <div className={'col-sm-12'}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute path="/" authed={true} component={Main}/>
                </Switch>
            </div>
        </div>
    </div>
);

export default withRouter(observer(App));
