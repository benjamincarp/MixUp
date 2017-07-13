import { connect } from 'react-redux'
import DrinkComponent from '../components/drink.jsx';
import * as drinkActions from '../actions/drinks';

const mapStateToProps = (state, ownProps) => (
    {
        drink: state.drinks.current
    }  
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        submitAction: (drink) => dispatch(drinkActions.saveDrink(drink)),
        didMount: () => dispatch(drinkActions.loadDrink(ownProps.match.params.drinkId)),
        willUnmount: () => dispatch(drinkActions.clearCurrentDrink())
    }
);

const Drink = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinkComponent);

export default Drink