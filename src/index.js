import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import css from './styles/style.scss';
import initData from './actions/initData';

// satcheljs components
import {trace} from 'satcheljs-trace';
import {applyMiddleware, ActionMessage, DispatchFunction} from 'satcheljs';
import devtool from 'satcheljs-react-devtools';

// react hot reload component
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

// react router component
import {BrowserRouter, HashRouter} from 'react-router-dom';


const traceMiddleware = (next, actionMessage) =>  {
    console.log("Dispatching action: " + actionMessage.type);
    next(actionMessage);
};

const getInitData = () => {
    const reactContainer = document.getElementById('app')
    const rawData = reactContainer.getAttribute('data-react')
    const data = JSON.parse(rawData);
    initData(data)
}

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <HashRouter>
                <Component />
            </HashRouter>
        </AppContainer>,
        document.getElementById('app')
    );
};

const init =() => {
    // Optionally enable some dev tools based on a URL parameter
    const regex = new RegExp("[\\?&]devtools=");
    const url = window.location.href.toLowerCase();
    if (regex.exec(url)) {
        applyMiddleware(devtool, trace);
        traceMiddleware(DispatchFunction, ActionMessage);
    }

    // Render the app
    render(App);
    getInitData();
    if (module.hot) {
        module.hot.accept('./components/App', () => { render(App) });
    }
};

init();


