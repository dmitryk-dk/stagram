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

// Subscribe to orchestrators
import '../orchestrators/login';
import '../orchestrators/posts';
import '../orchestrators/comments';
import '../orchestrators/signup';
import '../orchestrators/logout';

const sampleData = {
    endpoints: {},
    comments: {},
    posts: [],
    login: null,
    password: null,
    isAuthed: false,
    isLoggedIn: false,
    nickName: null,
};

export default createStore('StagramStore', sampleData);
