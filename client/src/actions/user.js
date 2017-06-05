import fetch from 'isomorphic-fetch'

export const REQUEST_USER_SUCCESS = "REQUEST_USER_SUCCESS";
export const REQUEST_USER = "REQUEST_USER";

function requestUser() {
    return {
        type: REQUEST_USER
    }
}

function receiveUser(user) {
    return {
        type: REQUEST_USER_SUCCESS,
        user
    }
}

function fetchUser() {
    return function (dispatch) {
        dispatch(requestUser());
        
        //TODO: make api to hit configurable
        return fetch(`http://localhost:3000/api/user`)
            .then(response => response.json())
            .then(json => dispatch(receiveUser(json)));
            //TODO: add error handling
    }
}


function shouldFetchUser(state) {
    if (state.user.isFetching) {
        return false
    } else {
        return state.user.needsLoad
    }
}

export function fetchUserIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState())) {
            return dispatch(fetchUser())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}