import { connect } from 'react-redux'
import DrinksListComponent from '../components/drinksList.jsx';

const mapStateToProps = (state, ownProps) => (
    {
        drinks: state.drinks
    }
);

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        // onClick: () => {
        //     dispatch(setVisibilityFilter(ownProps.filter))
        // }
    }
);

const DrinksList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrinksListComponent);

export default DrinksList