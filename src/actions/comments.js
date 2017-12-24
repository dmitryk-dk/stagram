import {action} from 'satcheljs';

export const commentsRequest = action('COMMENTS_REQUEST');
export const commentsSuccess =  action('COMMENTS_SUCCESS', (comments) => comments);
export const commentsFail = action('COMMENTS_FAIL');
