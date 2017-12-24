import {orchestrator, dispatch} from 'satcheljs';
import {loginRequest, loginSuccess, loginFail} from '../actions/login';
import {login} from '../services/login';
import getStore from '../store/store';

orchestrator(loginRequest, async () => {
    const store = getStore();
    const body = {login: store.login, password: store.password};
    const url = store.endpoints.login;
    await login(url, body)
            .then((resp)=> {
                resp.ok ? loginSuccess(): loginFail()
            });
});
