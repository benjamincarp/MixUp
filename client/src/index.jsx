import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import todoApp from './react/reducer'

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './react/app.jsx';

let store = createStore(todoApp);

const render = (Component) => {
    ReactDOM.render(
        <AppContainer store={store}>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./react/app.jsx', () => {
        render(App)
    });
}

// import React from 'react';
// import { render } from 'react-dom'
// import Root from './react/root.jsx'
//
// let store = createStore(todoApp);
//
// render(
//     <Root store={store} />,
//     document.getElementById('root')
// )