import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Main from './Main';
import Single from './SingleFrame.js';
import PhotoGrid from './PhotoGrid.js';
import {observer} from 'mobx-react';

const App = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/posts" component={PhotoGrid} />
        <Route exact path="/view/:postId" component={Single} />
    </Switch>
);

export default withRouter(observer(App));
