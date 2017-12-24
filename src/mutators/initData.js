import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import initData from "../actions/initData";
import { createHashHistory } from 'history';

const history = createHashHistory();

mutator(initData, ({endpoints, isAuthed}) => {
    if (isAuthed) {
        history.replace('/');
    }
    const store = getStore();
    store.endpoints = endpoints;
    store.isAuthed = isAuthed;
});
