import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {loginSuccess, loginFail} from "../actions/login";
import { createHashHistory } from 'history';

const history = createHashHistory();

mutator(loginSuccess, () => {
    const store = getStore();
    store.isAuthed = true;
    store.isLoggedIn = true;
    history.replace('/');
});

mutator(loginFail, () => {
    const store = getStore();
    store.isAuthed = false;
    store.isLoggedIn = false;
})
