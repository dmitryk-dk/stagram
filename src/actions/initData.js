import {action} from 'satcheljs';

export default action('init', ({posts, comments}) => ({
    posts,
    comments
}));
