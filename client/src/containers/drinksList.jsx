import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrinksListComponent from '../components/drinksList.jsx';
import PropTypes from 'prop-types';
import { fetchDrinksIfNeeded } from '../actions/drinks';

class DrinksListContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { loadDrinks } = this.props;
        console.log(this.props);
        loadDrinks();
    }
    
    render () {
        const { drinks } = this.props;
        return (<DrinksListComponent drinks={drinks}/>)
    }
}

DrinksListContainer.propTypes = {
    drinks: PropTypes.array.isRequired,
    loadDrinks: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => (
    {
        drinks: state.drinks.drinks
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        loadDrinks: () => dispatch(fetchDrinksIfNeeded())
    }
);

const DrinksList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinksListContainer);

export default DrinksList