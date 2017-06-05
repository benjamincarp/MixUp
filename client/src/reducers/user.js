import * as actions from '../actions/user';

const initialState ={
    user: {},
    needsLoad: true,
    isFetching: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.REQUEST_USER:
            return {
                ...state,
                isFetching: true
            };

        case actions.REQUEST_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                needsLoad: false,
                isFetching: false
            };

        default:
            return state
    }
};

export default userReducer;