import {orchestrator, dispatch} from 'satcheljs';
import {signupRequest, signupSuccess, signupFail} from '../actions/signup';
import {signup} from '../services/signup';
import getStore from '../store/store';

orchestrator(signupRequest, async () => {
    const store = getStore();
    const body = {
        login: store.login, 
        password: store.password, 
        nickName: store.nickName
    };
    const url = store.endpoints.signup;
    await signup(url, body)
            .then((resp)=> {
                resp.ok ? signupSuccess(): signupFail()
            });
});
