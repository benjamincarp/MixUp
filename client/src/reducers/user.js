import * as actions from '../actions/user';
import _ from 'underscore';

const initialState ={
    user: {},
    credentials: {},
    needsLoad: true,
    isFetching: false,
    isLoggedIn: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.REQUEST_USER:
        case actions.LOGIN:
            return {
                ...state,
                isFetching: true
            };

        case actions.REQUEST_USER_SUCCESS:
        case actions.LOGIN_SUCCESS:
            let isLoggedIn = !_.isEmpty(action.user);
            return {
                ...state,
                user: action.user,
                needsLoad: false,
                isFetching: false,
                isLoggedIn
            };
            
        case actions.UPDATE_CREDENTIALS_FIELD:
            let newState = {...state};
            newState.credentials[action.key] = action.value;
            return newState;

        default:
            return state
    }
};

export default userReducer;