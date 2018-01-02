import React from 'react';
import Photo from './Photo';
import getStore from '../store/store';
import {observer} from 'mobx-react';

const PhotoGrid = ({store}) => ( 
    <div className="photo-grid">
        {store.posts.map((post, i) => <Photo post={post} comments={store.comments} key={i} />)}
    </div>
);

export default observer(PhotoGrid);
