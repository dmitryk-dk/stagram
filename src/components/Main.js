import React from 'react';
import {observer} from 'mobx-react';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import Single from './SingleFrame.js';
import PhotoGrid from './PhotoGrid.js';
import Signup from './Signup';

const Main = () => (
    <div>
        <Link to="/posts">
            <h1>Danger! Posts</h1>
        </Link>
        <Switch>
            <Route exact path="/posts" component={PhotoGrid} />
            <Route exact path="/view/:postId" component={Single} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    </div>
);

export default withRouter(observer(Main));
