import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';

const Main = () => (
    <div>
        <h1>
            <Link to="/">Reduxstagram</Link>
        </h1>
        <h1>
            <Link to="/posts">Posts</Link>
        </h1>
        <h1>
            <Link to="/signup">Signup</Link>
        </h1>
    </div>
);

export default observer(Main);
