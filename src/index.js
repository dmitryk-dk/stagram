import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import css from './styles/style.scss';
import initData from './actions/initData';

// satcheljs components
import {trace} from 'satcheljs-trace';
import {applyMiddleware, ActionMessage, DispatchFunction} from 'satcheljs';

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
    // Optionally enable some dev tools
    const assembly = process.env.NODE_ENV;
    if (assembly !== 'production') {
        applyMiddleware(require('satcheljs-react-devtools').default, trace);
    }

    // Render the app
    render(App);
    getInitData();
    if (module.hot) {
        module.hot.accept('./components/App', () => { render(App) });
    }
};

init();


