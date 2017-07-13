import fetch from 'isomorphic-fetch'

export const REQUEST_DRINKS_SUCCESS = "REQUEST_DRINKS_SUCCESS";
export const REQUEST_DRINKS = "REQUEST_DRINKS";
export const SET_CURRENT_DRINK = "SET_CURRENT_DRINK";
export const CREATE_DRINK = "CREATE_DRINK";
export const CLEAR_CURRENT_DRINK = "CLEAR_CURRENT_DRINK";
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

export function updateIngredientLine(index, value) {
    return {
        type: UPDATE_INGREDIENT_LINE,
        index,
        value
    };
}

export function addIngredientLine() {
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

export function saveDrink() {
    console.log('save drink');
    return (dispatch, getState) => {
        const drink = getState().drinks.current;
        
        let url, options;
        let body = {...drink};
        delete body.hasLoaded;
        delete body.url;
        delete body.create_date;
        
        if (drink.id === ''){
            delete body.id;
            
            url = `http://localhost:3000/api/drinks`;
            options = {
                method: 'POST',
                data: body
            }
        }
        else{
            url = `http://localhost:3000/api/drinks/${drink.id}`;
            options = {
                method: 'PUT',
                data: body
            }
        }
        console.dir(url);
        console.dir(options);
        
        return fetch(url, options)
            .then(response => response.json())
            .then(json => console.dir(json));
        //TODO: add error handling
    }
}

export function clearCurrentDrink() {
    console.log('clear drink');
    return {
        type: CLEAR_CURRENT_DRINK
    };
}

function setCurrentDrink(drink) {
    return {
        type: SET_CURRENT_DRINK,
        drink
    };
}

function createDrink() {
    return {
        type: CREATE_DRINK
    };
}

export function loadDrink(id) {
    return (dispatch, getState) => {
        console.log(`load drink ${id}`);
        let drink;
        
        if (id === 'new') {
            return dispatch(createDrink());
        }

        drink = getState().drinks.drinks.find((drinkObj) => (drinkObj.id.toString() === id));

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