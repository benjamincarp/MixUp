import { connect } from 'react-redux'
import DrinkComponent from '../components/drink.jsx';

const mapStateToProps = (state, ownProps) => {
    let drink = state.drinks.find((drinkObj) => (drinkObj.id.toString() === ownProps.match.params.drinkId));
    
    //keep the proptypes happy. The component will handle a bad ID
    if (!drink) drink = { 
        id: ownProps.match.params.drinkId,
        notFound: true
    };
    
    return { drink };
};

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        // onClick: () => {
        //     dispatch(setVisibilityFilter(ownProps.filter))
        // }
    }
);

const Drink = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinkComponent);

export default Drink