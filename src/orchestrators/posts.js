import {orchestrator, dispatch} from 'satcheljs';
import {postsRequest, postsSuccess, postsFail} from '../actions/posts';
import {posts} from '../services/posts';
import getStore from '../store/store';

orchestrator(postsRequest, async () => {
    console.log('here');
    const store = getStore();
    const url = store.endpoints.posts;
    await posts(url)
            //.then((resp)=> resp.ok ? postsSuccess(): postsFail());
            .then(({posts})=>postsSuccess(posts))
            .then(()=>postsFail());
});
