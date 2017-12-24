import {action} from 'satcheljs';

export default action('init', ({endpoints, isAuthed}) => ({
    endpoints,
    isAuthed,
}));
