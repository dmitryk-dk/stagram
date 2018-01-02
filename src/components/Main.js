import React from 'react';
import {observer} from 'mobx-react';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {postsRequest} from '../actions/posts';
import {commentsRequest} from '../actions/comments';
import {logoutRequest} from '../actions/logout';
import Single from './SingleFrame.js';
import PhotoGrid from './PhotoGrid.js';
import Signup from './Signup';
import getStore from '../store/store';

const Main = () => {
    const store = getStore();
    return (
        <div>
            <button className={'btn btn-primary btn-block'} onClick={()=>logoutRequest()}>Logout</button>
            <Link to="/posts">
                <h1 onClick={getData}>Click equal Posts</h1>
            </Link>
            <Switch>
                <Route exact path="/posts" render={(props) => <PhotoGrid store={store} {...props}/>} />
                <Route exact path="/view/:postId" render={(props) => <Single store={store} {...props} />} />
                <Route exact path="/signup" render={(props) => <Signup store={store} {...props}/>} />
            </Switch>
        </div>
    );
}
    


const getData = () => {
    postsRequest();
    commentsRequest();
}

export default withRouter(observer(Main));
