import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {loginSuccess} from "../actions/login";

mutator(loginSuccess, (msg) => {
    const store = getStore();
    store.isAuthed = true;
});
