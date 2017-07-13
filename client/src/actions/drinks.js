import fetch from 'isomorphic-fetch'

export const REQUEST_DRINKS_SUCCESS = "REQUEST_DRINKS_SUCCESS";
export const REQUEST_DRINKS = "REQUEST_DRINKS";
export const UPDATE_DRINK_FIELD = "UPDATE_DRINK_FIELD";

export function saveDrink(drink) {
    console.log('save drink');
    console.dir(drink);
}

export function loadDrink(state, id) {
    if (id === 'new') {
        return {
            name: '',
            ingredients: [],
            instructions: ''
        };    
    }
    
    let drink = state.drinks.drinks.find((drinkObj) => (drinkObj.id.toString() === id));

    //keep the proptypes happy. The component will handle a bad ID
    if (!drink) drink = {
        id: id,
        notFound: true
    };
    
    return drink;
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