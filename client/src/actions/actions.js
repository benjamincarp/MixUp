import fetch from 'isomorphic-fetch'

export const REQUEST_DRINKS_SUCCESS = "REQUEST_DRINKS_SUCCESS";
export const REQUEST_DRINKS = "REQUEST_DRINKS";

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

export function fetchDrinks() {

    return function (dispatch) {

        dispatch(requestDrinks());

        //TODO: make api to hit configurable
        return fetch(`http://localhost:3000/api/drinks`)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                return dispatch(receiveDrinks(json))
            });
            //TODO: add error handling
    }
}