import React from 'react';
import getStore from '../store/store';
import formFieldChange from '../actions/formFieldChange';
import {signupRequest} from '../actions/signup';
import {observer} from 'mobx-react';

const Signup = () => {

    const store = getStore();
    const login = store.login;
    const password = store.password;
    const nickName = store.nickName;
    return (
        <div className={'d-flex align-items-center justify-content-center flex-column'}>
            <h1>Signup</h1>
            <form onSubmit={(e) => submit(e)} >
                <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input 
                        type="text"
                        name="login" 
                        className="form-control" 
                        id="login" 
                        aria-describedby="loginHelp" 
                        placeholder="Enter email"
                        value={login}
                        onChange={(e) => formFieldChange(e.target)} 
                    />
                    <small 
                        id="loginHelp" 
                        className="form-text text-muted"
                    >
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => formFieldChange(e.target)}  
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nickName">Nick Name</label>
                    <input 
                        type="nickName"
                        name="nickName" 
                        className="form-control" 
                        id="nickName" 
                        placeholder="Nick name"
                        value={nickName}
                        onChange={(e) => formFieldChange(e.target)}  
                    />
                </div>
                <button type="submit" className="btn btn-success btn-block">Signup</button>
            </form>
        </div>
    )
};

const submit = (e) => {
    signupRequest();
    e.preventRequest;
}





export default observer(Signup);
