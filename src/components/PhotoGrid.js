import React from 'react';
import Photo from './Photo';
import getStore from '../store/store';
import {observer} from 'mobx-react';

const PhotoGrid = () => {

    const store = getStore();
    const posts = store.posts;

    return (
        <div className="photo-grid">
            {posts.map((post, i) => <Photo post={post} key={i}/>)}
        </div>
    );
};

export default observer(PhotoGrid);
