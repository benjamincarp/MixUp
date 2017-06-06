import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import DrinksList from '../containers/drinksList.jsx';
import Drink from '../containers/drink.jsx';
import Login from '../containers/login.jsx';
import Register from '../containers/register.jsx';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/drinks/:drinkId" component={Drink} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/" component={DrinksList} />
            </div>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;