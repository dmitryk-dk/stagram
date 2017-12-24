import {orchestrator, dispatch} from 'satcheljs';
import {logoutRequest, logoutSuccess, logoutFail} from '../actions/logout';
import {logout} from '../services/logout';
import getStore from '../store/store';

orchestrator(logoutRequest, async () => {
    const store = getStore();
    const body = {};
    const url = store.endpoints.logout;
    await logout(url, body)
            .then((resp)=> {
                resp.ok ? logoutSuccess(): logoutFail()
            });
});
