import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export const loginRequest = action(actionTypes.LOGIN_REQUEST);
export const loginSuccess =  action(actionTypes.LOGIN_SUCCESS);
export const loginFail = action(actionTypes.LOGIN_FAIL);
