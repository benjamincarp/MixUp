import * as actions from '../actions/drinks';

const initialState ={
    drinks: [],
    needsLoad: true,
    isFetching: false,
    current: {}
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
            
        case actions.SET_CURRENT_DRINK:
            console.log('set drink in reducer');
            return {
                ...state,
                current: action.drink
            };
            
        default:
            return state
    }
};

export default drinksReducer;