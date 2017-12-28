import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export default action(actionTypes.FORM_FIELD_CHANGE, ({name, value}) => ({name, value}));

