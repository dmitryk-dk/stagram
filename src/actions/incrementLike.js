import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export default action(actionTypes.INCREMENT_LIKE, (id) => ({id}));

