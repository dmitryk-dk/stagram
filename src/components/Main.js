import React from 'react';
import {observer} from 'mobx-react';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {postsRequest} from '../actions/posts';
import {commentsRequest} from '../actions/comments';
import Single from './SingleFrame.js';
import PhotoGrid from './PhotoGrid.js';
import Signup from './Signup';
import getStore from '../store/store';

const Main = () => (
    <div>
        <Link to="/posts">
            <h1 onClick={getData}>Danger! Posts</h1>
        </Link>
        <Switch>
            <Route exact path="/posts" component={PhotoGrid} />
            <Route exact path="/view/:postId" component={Single} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    </div>
);

const getData = () => {
    postsRequest();
    commentsRequest();
}

export default withRouter(observer(Main));
