import * as actions from '../actions/actions';

const initialState ={
    drinks: [],
    needsLoad: true,
    isFetching: false
};

const drinksReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actions.REQUEST_DRINKS:
            return {
                ...state,
                isFetching: true
            };
            
        case actions.REQUEST_DRINKS_SUCCESS:
            return {
                ...state, 
                drinks: state.drinks.concat(action.drinks),
                needsLoad: false,
                isFetching: false
            };
            
        default:
            return state
    }
};

export default drinksReducer;