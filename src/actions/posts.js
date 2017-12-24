import {action} from 'satcheljs';

export const postsRequest = action('POST_REQUEST');
export const postsSuccess =  action('POST_SUCCESS', (posts) => posts);
export const postsFail = action('POST_FAIL');
