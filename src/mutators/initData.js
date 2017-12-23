import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import initData from "../actions/initData";
import { createHashHistory } from 'history';

const history = createHashHistory();

mutator(initData, ({posts, comments, isAuthed}) => {
    const store = getStore();
    store.posts = posts;
    store.comments = comments;
    store.isAuthed = isAuthed;
    if (isAuthed) {
        history.replace('/');
    }
});
