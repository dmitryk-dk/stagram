import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {addCommentRequest, addCommentSuccess, addCommentFail} from "../actions/addComment";
import { createHashHistory } from 'history';

mutator(addCommentSuccess, ({commentId}) => {
    const store = getStore();
    const text = store.comment;
    const user = store.nickName;
    Object.keys(store.comments).forEach(comment => { 
        if (comment === commentId) {
            store.comments = {
                ...store.comments,
                ...store.comments[commentId].push({user, text})
            }
            store.nickName = '';
            store.comment = '';
        }
        if (!store.comments[commentId]) {
            store.comments = {
                ...store.comments,
                [commentId]: [
                    {user, text}
                ]
            }
            store.nickName = '';
            store.comment = '';
        }
    });
});

mutator(addCommentFail, () => {
    
})
