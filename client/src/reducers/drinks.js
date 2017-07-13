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
        
        case actions.UPDATE_DRINK_FIELD:
            let newState = {...state};
            newState.current[action.key] = action.value;
            return newState;

        case actions.ADD_INGREDIENT_LINE:
            let newState = {...state};
            newState.current.ingredients.push('');
            return newState;

        case actions.REMOVE_INGREDIENT_LINE:
            let newState = {...state};
            newState.current.ingredients.splice(action.index);
            return newState;

        case actions.UPDATE_INGREDIENT_LINE:
            let newState = {...state};
            newState.current.ingredients[action.index] = action.value;
            return newState;

        default:
            return state
    }
};

export default drinksReducer;