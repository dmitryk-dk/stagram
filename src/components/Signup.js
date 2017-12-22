import React from 'react';
import getStore from '../store/store';
import formFieldChange from '../actions/formFieldChange';
import {observer} from 'mobx-react';

const Signup = () => {

    const store = getStore();
    const login = store.login;
    const password = store.password;
    return (
        <form className={'signup-form'} onSubmit={ (event) => onSubmit(event) }>
            <input 
                type="text" 
                name="login" 
                value={login} 
                onChange={(e) => formFieldChange(e.target)}
            />
            <input 
                type="text" 
                name="password" 
                value={password} 
                onChange={(e) => formFieldChange(e.target)}
            />
            <input type="submit" value="Sign up"/>   
        </form>
    );
};





export default observer(Signup);
