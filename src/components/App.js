import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivatRoute';
import {observer} from 'mobx-react';
import getStore from '../store/store';

const App = () => {
    const store = getStore();
    return (
        <div className={'container-fluid'}>
            <div className={'row'}>
                <div className={'col-sm-12'}>
                    <Switch>
                        <Route exact path="/login" render={(props) => <Login store={store} {...props}/>} />
                        <Route exact path="/signup" render={(props) => <Signup store={store} {...props} />} />
                        <PrivateRoute path="/" authed={getStore().isAuthed} component={Main}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}
    

export default withRouter(observer(App));
