import {orchestrator, dispatch} from 'satcheljs';
import {loginRequest, loginSuccess, loginFail} from '../actions/login';
import {login} from '../services/login';
import getStore from '../store/store';

orchestrator(loginRequest, async () => {
    const store = getStore();
    const body = {login: store.login, passwrod: store.password};
    await login(body)
            
            .catch(()=>loginFail());
            loginSuccess()
});
