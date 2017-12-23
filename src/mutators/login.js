import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {loginSuccess} from "../actions/login";
import { createHashHistory } from 'history';

const history = createHashHistory();

mutator(loginSuccess, () => {
    const store = getStore();
    store.isAuthed = true;
    history.replace('/');
});
