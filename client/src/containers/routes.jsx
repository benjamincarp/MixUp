import React, {Component} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import { fetchDrinksIfNeeded } from '../actions/drinks';
import DrinksList from '../containers/drinksList.jsx';
import Drink from '../containers/drink.jsx';
import Login from '../containers/login.jsx';
import Register from '../containers/register.jsx';

class RoutesContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { loadDrinks } = this.props;
        loadDrinks();
    }
    
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/drinks/:drinkId" component={Drink} />
                    <Route exact path="/drinks" component={() => (<Redirect to="/" />)} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={DrinksList} />
                    <Route component={() => (<h1>404 - Page not found</h1>)} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        loadDrinks: () => dispatch(fetchDrinksIfNeeded())
    }
);

const Routes = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoutesContainer);

export default Routes;