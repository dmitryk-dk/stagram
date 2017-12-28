import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export const signupRequest = action(actionTypes.SIGNUP_REQUEST);
export const signupSuccess =  action(actionTypes.SIGNUP_SUCCESS);
export const signupFail = action(actionTypes.SIGNUP_FAIL);
