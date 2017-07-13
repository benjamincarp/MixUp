import { connect } from 'react-redux'
import DrinkComponent from '../components/drink.jsx';
import * as drinkActions from '../actions/drinks';

const mapStateToProps = (state, ownProps) => {
    let drink = drinkActions.loadDrink(state, ownProps.match.params.drinkId);
    
    return { drink };
};

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        submitAction: (drink) => dispatch(drinkActions.saveDrink(drink))
    }
);

const Drink = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinkComponent);

export default Drink