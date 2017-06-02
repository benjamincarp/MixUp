export const REQUEST_DRINKS_SUCCESS = "REQUEST_DRINKS_SUCCESS";
export const REQUEST_DRINKS = "REQUEST_DRINKS";

export function loadDrinks() {
    return (dispatch) => {
        dispatch(fetchDrinks());
        return { type: REQUEST_DRINKS };
    }
}

function fetchDrinks(){
    //TODO: replace with a fetch call to the API
    const drinks = [
        {
            id: 1,
            name: "Manhattan"
        },
        {
            id: 2,
            name: "Margarita"
        },
        {
            id: 3,
            name: "Down Easter"
        },
        {
            id: 4,
            name: "Daiquiri"
        }
    ];

    return { type: REQUEST_DRINKS_SUCCESS, drinks };
}