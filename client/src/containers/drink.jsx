import { connect } from 'react-redux'
import DrinkComponent from '../components/drink.jsx';
import * as drinkActions from '../actions/drinks';

const mapStateToProps = (state, ownProps) => (
    {
        drink: {...state.drinks.current}
    }  
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        submitAction: (drink) => dispatch(drinkActions.saveDrink(drink)),
        didMount: () => dispatch(drinkActions.loadDrink(ownProps.match.params.drinkId)),
        willUnmount: () => dispatch(drinkActions.clearCurrentDrink()),
        fieldUpdateAction: (key, value) => dispatch(drinkActions.updateDrinkField(key, value)),
        addIngredientLine: () => dispatch(drinkActions.addIngredientLine()),
        removeIngredientLine: (index) => dispatch(drinkActions.removeIngredientLine(index)),
        updateIngredientLine: (index, value) => dispatch(drinkActions.updateIngredientLine(index, value))
    }
);

const Drink = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinkComponent);

export default Drink