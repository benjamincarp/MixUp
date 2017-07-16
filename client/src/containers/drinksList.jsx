import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrinksListComponent from '../components/drinksList.jsx';
import { fetchDrinksIfNeeded } from '../actions/drinks';

const mapStateToProps = (state, ownProps) => (
    {
        drinks: state.drinks.drinks
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        fetchDrinksIfNeeded: () => dispatch(fetchDrinksIfNeeded())
    }
);

const DrinksList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinksListComponent);

export default DrinksList