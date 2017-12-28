import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export default action(actionTypes.INIT_DATA, ({endpoints, isAuthed}) => ({
    endpoints,
    isAuthed,
}));
