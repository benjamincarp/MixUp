import fetch from 'isomorphic-fetch'

export const REQUEST_DRINKS_SUCCESS = "REQUEST_DRINKS_SUCCESS";
export const REQUEST_DRINKS = "REQUEST_DRINKS";
export const UPDATE_DRINK_FIELD = "UPDATE_DRINK_FIELD";

export function saveDrink(drink) {
    console.log('save drink');
    console.dir(drink);
}

export function loadDrink(id) {
    return (dispatch, getState) => {
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

        return drink;
    }
}