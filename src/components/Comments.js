import React from 'react';
import Comment from './Comment';
import getStore from '../store/store';
import {observer} from 'mobx-react';


const Comments = ({commentId}) => {

    const store = getStore();
    const comments = store.comments;
    console.log('commentsId', commentId)
    return (
        <div className="comments">
            {
                Object.keys(comments).map(
                    (comment) => comment === commentId ?
                        comments[commentId].map(comment => <Comment comment={comment}/>) :
                            null
                )
            }
            <form
                className="comment-form"
                onSubmit={() => console.log('submit')}>
                <input
                    type="text"
                    placeholder="author"
                    onChange={() => console.log('change')}
                />
                <input
                    type="text"
                    placeholder="comment"
                    onChange={()=>console.log('change')}
                />
                <input type="submit" hidden />
            </form>
        </div>
    );
};


export default observer(Comments);
