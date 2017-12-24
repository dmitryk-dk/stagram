import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {signupSuccess, signupFail} from "../actions/signup";
import { createHashHistory } from 'history';

const history = createHashHistory();

mutator(signupSuccess, () => {
    const store = getStore();
    store.isAuthed = true;
    store.isLoggedIn = true;
    history.replace('/');
});

mutator(signupFail, () => {
    const store = getStore();
    //store.isAuthed = false;
    //store.isLoggedIn = false;
})
