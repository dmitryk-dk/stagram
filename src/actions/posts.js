import {action} from 'satcheljs';
import * as actionTypes from './actionTypes';

export const postsRequest = action(actionTypes.POSTS_REQUEST);
export const postsSuccess =  action(actionTypes.POSTS_SUCCESS, (posts) => posts);
export const postsFail = action(actionTypes.POSTS_FAIL);
