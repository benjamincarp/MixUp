import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import App from './app.jsx';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path="/(:filter)" component={App} />
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;