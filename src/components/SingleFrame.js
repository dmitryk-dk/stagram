import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import {observer} from 'mobx-react';
import getStore from '../store/store';

const SingleFrame = ({store, match}) => (
    <div className="single-photo">
        <Photo post={store.posts[findIndex(store.posts, match)]} comments={store.comments}/>
        <Comments 
            commentId={store.posts[findIndex(store.posts, match)].code} 
            comments={store.comments} 
            comment={store.comment}
            nickName={store.nickName}
        />
    </div>
);

const findIndex = (posts, match) => posts.findIndex((post) => {
    return post.code === match.params.postId;
})

export default observer(SingleFrame);
