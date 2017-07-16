import * as actions from '../actions/drinks';

const emptyDrink = {
    name: '',
    ingredients: [''],
    instructions: '',
    id: '',
    hasLoaded: false
};

const initialState ={
    drinks: [],
    needsLoad: true,
    isFetching: false,
    current: emptyDrink
};

const drinksReducer = (state = initialState, action) => {
    let newState = {...state};
    
    switch (action.type) {
        
        case actions.REQUEST_DRINKS:
            return {
                ...state,
                isFetching: true
            };
            
        case actions.REQUEST_DRINKS_SUCCESS:
            return {
                ...state, 
                drinks: action.drinks,
                needsLoad: false,
                isFetching: false
            };
            
        case actions.DRINKS_NEED_RELOAD:
            return {
                ...state,
                needsLoad: true
            };
            
        case actions.SET_CURRENT_DRINK:
            return {
                ...state,
                current: {
                    ...action.drink, 
                    hasLoaded: true
                }
            };

        case actions.CREATE_DRINK:
            return {
                ...state,
                current: {
                    ...emptyDrink,
                    hasLoaded: true
                }
            };

        case actions.CLEAR_CURRENT_DRINK:
            return {
                ...state,
                current: emptyDrink
            };
        
        case actions.UPDATE_DRINK_FIELD:
            newState.current[action.key] = action.value;
            return newState;

        case actions.ADD_INGREDIENT_LINE:
            newState.current.ingredients.push('');
            return newState;

        case actions.REMOVE_INGREDIENT_LINE:
            newState.current.ingredients.splice(action.index, 1);
            return newState;

        case actions.UPDATE_INGREDIENT_LINE:
            newState.current.ingredients[action.index] = action.value;
            return newState;

        default:
            return state
    }
};

export default drinksReducer;