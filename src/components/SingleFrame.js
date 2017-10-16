import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import {observer} from 'mobx-react';
import getStore from '../store/store';

const SingleFrame = ({match}) => {

    const store = getStore();
    const posts = store.posts;

    const index = posts.findIndex((post) => {
        return post.code === match.params.postId;
    });

    const post = posts[index];

    return (
        <div className="single-photo">
            <Photo post={post}/>
            <Comments commentId={post.code}/>
        </div>
    );
};

export default observer(SingleFrame);
