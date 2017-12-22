import {action} from 'satcheljs';

export default action('fieldChange', ({name, value}) => ({name, value}));

