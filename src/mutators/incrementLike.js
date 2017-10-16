import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import incrementLike from "../actions/incrementLike";

mutator(incrementLike, (msg) => {
    const store = getStore();
    store.posts.map(post => post.id === msg.id ? post.likes++ : post);
});

