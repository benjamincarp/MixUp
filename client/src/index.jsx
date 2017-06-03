import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer';
import thunk from 'redux-thunk';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './containers/app.jsx';

let store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const render = (Component) => ReactDOM.render(
            <AppContainer>
                <Component store={store}/>
            </AppContainer>,
            document.getElementById('root')
        );

render(App);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/app.jsx', () => {
        render(App)
    });
}
