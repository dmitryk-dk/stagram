import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import formFieldChange from '../actions/formFieldChange';
import {loginRequest} from '../actions/login';
import {observer} from 'mobx-react';

const Login = ({login, password}) => (
    <div className={'d-flex align-items-center justify-content-center flex-column'}>
        <h1>Reduxstagram</h1>
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
            <button type="submit" className="btn btn-success btn-block mb-2">Login</button>
            <Link to="/signup">
                <button type="button" className="btn btn-primary btn-block">Signup</button>
            </Link>
        </form>
    </div>
);

const submit = (event) => {
    loginRequest();
    event.preventDefault();
}

export default observer(Login);
