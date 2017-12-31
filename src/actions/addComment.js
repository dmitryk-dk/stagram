import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export const addCommentRequest = action(actionTypes.ADD_COMMENT_REQUEST, (commentId)=>({commentId}));
export const addCommentSuccess =  action(actionTypes.ADD_COMMENT_SUCCESS, (commentId)=>({commentId}));
export const addCommentFail = action(actionTypes.ADD_COMMENT_FAIL);
