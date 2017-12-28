import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export const commentsRequest = action(actionTypes.COMMENTS_REQUEST);
export const commentsSuccess =  action(actionTypes.COMMENTS_SUCCESS, (comments) => comments);
export const commentsFail = action(actionTypes.COMMENTS_FAIL);
