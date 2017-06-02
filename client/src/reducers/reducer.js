import * as actions from '../actions/actions';

const initialState ={
    drinks: [],
    loaded: false,
    isLoading: false
};

const drinksReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actions.REQUEST_DRINKS:
            return {
                ...state,
                isLoading: true
            };
            
        case actions.REQUEST_DRINKS_SUCCESS:
            return {
                ...state, 
                drinks: action.drinks,
                loaded: true,
                isLoading: false
            };
            
        default:
            return state
    }
};

export default drinksReducer;