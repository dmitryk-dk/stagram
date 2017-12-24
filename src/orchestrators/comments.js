import {orchestrator, dispatch} from 'satcheljs';
import {commentsRequest, commentsSuccess, commentsFail} from '../actions/comments';
import {comments} from '../services/comments';
import getStore from '../store/store';

orchestrator(commentsRequest, async () => {
    const store = getStore();
    const url = store.endpoints.comments;
    await comments(url)
            .then(({comments}) => commentsSuccess(comments))
            .catch(() => commentsFail())
});
