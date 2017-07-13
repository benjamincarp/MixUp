import fetch from 'isomorphic-fetch'

export const REQUEST_DRINKS_SUCCESS = "REQUEST_DRINKS_SUCCESS";
export const REQUEST_DRINKS = "REQUEST_DRINKS";
export const SET_CURRENT_DRINK = "SET_CURRENT_DRINK";
export const UPDATE_DRINK_FIELD = "UPDATE_CREDENTIALS_FIELD";
export const ADD_INGREDIENT_LINE = "ADD_INGREDIENT_LINE";
export const REMOVE_INGREDIENT_LINE = "REMOVE_INGREDIENT_LINE";
export const UPDATE_INGREDIENT_LINE = "UPDATE_INGREDIENT_LINE";

export function updateDrinkField(key, value) {
    return {
        type: UPDATE_DRINK_FIELD,
        key,
        value
    };
}

export function updateIngredientLinw(index, value) {
    return {
        type: UPDATE_INGREDIENT_LINE,
        index,
        value
    };
}

export function addIngredientLinw() {
    return {
        type: ADD_INGREDIENT_LINE
    };
}

export function removeIngredientLine(index) {
    return {
        type: REMOVE_INGREDIENT_LINE,
        index
    };
}

export function saveDrink(drink) {
    console.log('save drink');
    console.dir(drink);
}

export function clearCurrentDrink() {
    console.log('clear drink');
    return setCurrentDrink({});
}

function setCurrentDrink(drink) {
    return {
        type: SET_CURRENT_DRINK,
        drink
    }
}

export function loadDrink(id) {
    return (dispatch, getState) => {
        console.log(`load drink ${id}`);
        if (id === 'new') {
            return {
                name: '',
                ingredients: [],
                instructions: ''
            };
        }

        let drink = getState().drinks.drinks.find((drinkObj) => (drinkObj.id.toString() === id));

        //keep the proptypes happy. The component will handle a bad ID
        if (!drink) drink = {
            id: id,
            notFound: true
        };
        
        return dispatch(setCurrentDrink(drink));
    }
}


function requestDrinks() {
    return {
        type: REQUEST_DRINKS
    }
}

function receiveDrinks(drinks) {
    return {
        type: REQUEST_DRINKS_SUCCESS,
        drinks
    }
}

function fetchDrinks() {
    return function (dispatch) {
        dispatch(requestDrinks());
        
        //TODO: make api to hit configurable
        return fetch(`http://localhost:3000/api/drinks`)
            .then(response => response.json())
            .then(json => dispatch(receiveDrinks(json)));
            //TODO: add error handling
    }
}


function shouldFetchDrinks(state) {
    if (state.drinks.isFetching) {
        return false
    } else {
        return state.drinks.needsLoad
    }
}

export function fetchDrinksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchDrinks(getState())) {
            return dispatch(fetchDrinks())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}