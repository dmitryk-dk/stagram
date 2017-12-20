import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import initData from "../actions/initData";

mutator(initData, ({posts, comments}) => {
    const store = getStore();
    store.posts = posts;
    store.comments = comments;
});
