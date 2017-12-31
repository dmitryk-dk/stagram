import {createStore} from 'satcheljs';

// Subscribe to mutators
import '../mutators/incrementLike';
import '../mutators/initData';
import '../mutators/formFieldChange';
import '../mutators/login';
import '../mutators/posts';
import '../mutators/comments';
import '../mutators/signup';
import '../mutators/logout';
import '../mutators/addComment';

// Subscribe to orchestrators
import '../orchestrators/login';
import '../orchestrators/posts';
import '../orchestrators/comments';
import '../orchestrators/signup';
import '../orchestrators/logout';
import '../orchestrators/addComment';

const sampleData = {
    endpoints: {},
    comments: {},
    posts: [],
    login: null,
    password: null,
    isAuthed: false,
    isLoggedIn: false,
    nickName: null,
    comment: null,
};

export default createStore('StagramStore', sampleData);
