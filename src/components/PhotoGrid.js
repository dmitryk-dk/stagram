import React from 'react';
import Photo from './Photo';
import getStore from '../store/store';
import {observer} from 'mobx-react';

const PhotoGrid = () => {

    const store = getStore();
    const posts = store.posts;

    return (
        <div className="photo-grid">
            {posts.map((post) => <Photo post={post}/>)}
        </div>
    );
};

export default observer(PhotoGrid);
