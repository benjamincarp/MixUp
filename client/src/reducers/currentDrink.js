import * as actions from '../actions/currentDrink';

const newDrink = {
    id: 'new',
    name: '',
    ingredients: [],
    instructions: ''
};

const initialState ={...newDrink};

const drinksReducer = (state = initialState, action) => {
    switch (action.type) {
            
        default:
            return state
    }
};

export default drinksReducer;