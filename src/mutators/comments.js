import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {commentsSuccess} from "../actions/comments";
import { createHashHistory } from 'history';

const history = createHashHistory();

mutator(commentsSuccess, (comments) => {
    const store = getStore();
    store.comments = comments;
});
