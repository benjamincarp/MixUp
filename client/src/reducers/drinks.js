const initialState ={
    drinks: [
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
            name: "Down Easter"
        }
    ]
};

const drinksReducer = (state = initialState, action) => {

    switch (action.type) {
        default:
            return state
    }
};

export default drinksReducer;