import {action} from 'satcheljs';

export default action('init', ({posts, comments, isAuthed}) => ({
    posts,
    comments,
    isAuthed,
}));
