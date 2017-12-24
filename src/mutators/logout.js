import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import {logoutSuccess, logoutFail} from "../actions/logout";
import { createHashHistory } from 'history';

//const history = createHashHistory();

mutator(logoutSuccess, () => {
    const store = getStore();
    store.comments={};
    store.posts=[];
    store.login=null;
    store.password=null;
    store.isAuthed=false;
    store.isLoggedIn=false;
    store.nickName=null;
    //history.replace('/');
});

//mutator(loginFail, () => {
    //const store = getStore();
    //store.isAuthed = false;
    //store.isLoggedIn = false;
//})
