import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export const logoutRequest = action(actionTypes.LOGOUT_REQUEST);
export const logoutSuccess =  action(actionTypes.LOGOUT_SUCCESS);
export const logoutFail = action(actionTypes.LOGOUT_FAIL);
