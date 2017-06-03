import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrinksListComponent from '../components/drinksList.jsx';
import PropTypes from 'prop-types';
import { fetchDrinks } from '../actions/actions';

class DrinksListContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchDrinks());
    }
    
    render () {
        const { drinks } = this.props;
        return (<DrinksListComponent drinks={drinks}/>)
    }
}

DrinksListContainer.propTypes = {
    drinks: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => (
    {
        drinks: state.drinks
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        dispatch
    }
);

const DrinksList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinksListContainer);

export default DrinksList