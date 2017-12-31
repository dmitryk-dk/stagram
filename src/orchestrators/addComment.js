import {orchestrator, dispatch} from 'satcheljs';
import {addCommentRequest, addCommentSuccess, addCommentFail} from '../actions/addComment';
import {addComment} from '../services/addComment';
import getStore from '../store/store';

orchestrator(addCommentRequest, async ({commentId}) => {
    const store = getStore();
    const url = store.endpoints.comment;
    const body = {
        [commentId]: {
            user: store.nickName, 
            text: store.comment
        }
    };
    await addComment(url, body)
        .then((resp)=> {
            resp.ok ? addCommentSuccess(commentId): addCommentFail()
        })
});
