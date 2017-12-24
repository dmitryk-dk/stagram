import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {postsSuccess} from "../actions/posts";

mutator(postsSuccess, (posts) => {
    console.log("posts ->>", posts)
    const store = getStore();
    store.posts = posts;
});
