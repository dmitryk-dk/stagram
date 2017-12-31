import React from 'react';
import Comment from './Comment';
import getStore from '../store/store';
import formFieldChange from '../actions/formFieldChange';
import {addCommentRequest} from '../actions/addComment'
import {observer} from 'mobx-react';


const Comments = ({commentId}) => {
    const store = getStore();
    const comments = store.comments;
    const nickName = store.nickName;
    const comment = store.comment;
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
                onSubmit={(e) => submit(e, commentId)}>
                <input
                    type="text"
                    name="nickName"
                    placeholder="nickName"
                    onChange={(e) => formFieldChange(e.target)}
                    value={nickName}
                />
                <input
                    type="text"
                    name="comment"
                    placeholder="comment"
                    onChange={(e) => formFieldChange(e.target)}
                    value={comment}
                />
                <input type="submit" hidden />
            </form>
        </div>
    );
};

const submit = (e, commentId) => {
    e.preventDefault();
    addCommentRequest(commentId);
}


export default observer(Comments);
