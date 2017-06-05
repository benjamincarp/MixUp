import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import DrinksList from '../containers/drinksList.jsx';
import Drink from '../containers/drink.jsx';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/:drinkId" component={Drink} />
                <Route exact path="/" component={DrinksList} />
            </div>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;