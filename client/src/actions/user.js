import fetch from 'isomorphic-fetch';

export const REQUEST_USER = "REQUEST_USER";
export const REQUEST_USER_SUCCESS = "REQUEST_USER_SUCCESS";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const UPDATE_CREDENTIALS_FIELD = "UPDATE_CREDENTIALS_FIELD";

function requestUser() {
    return {
        type: REQUEST_USER
    };
}

function receiveUser(user) {
    return {
        type: REQUEST_USER_SUCCESS,
        user
    };
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
        return false;
    } else {
        return state.user.needsLoad;
    }
}

export function fetchUserIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState())) {
            return dispatch(fetchUser())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}

export function updateCredentialsField(key, value) {
    return {
        type: UPDATE_CREDENTIALS_FIELD,
        key,
        value
    };
}

function requestRegister() {
    return {
        type: REGISTER
    };
}

function receiveRegister(user) {
    return {
        type: REGISTER_SUCCESS,
        user
    };
}

function fetchRegister() {
    return function (dispatch, getState) {
        dispatch(requestRegister());

        let credentials = getState().user.credentials;
        
        //TODO: make api to hit configurable
        
        const url = `http://localhost:3000/api/users`;
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        };
        
        return fetch(url, options)
            .then(response => response.json())
            .then(json => dispatch(receiveRegister(json)));
        //TODO: add error handling
    };
}

function shouldRegister(state) {
    if (state.user.isFetching) {
        return false
    } else {
        return !state.user.isLoggedIn
    }
}

export function register() {
    return (dispatch, getState) => {
        if (shouldRegister(getState())) {
            return dispatch(fetchRegister())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    };
}

function requestLogin() {
    return {
        type: LOGIN
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        user
    };
}

function fetchLogin() {
    return function (dispatch, getState) {
        dispatch(requestLogin());

        let credentials = getState().user.credentials;

        //TODO: make api to hit configurable
        return fetch(`http://localhost:3000/api/session`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(json => dispatch(receiveLogin(json)));
        //TODO: add error handling
    };
}

function shouldLogin(state) {
    if (state.user.isFetching) {
        return false
    } else {
        return !state.user.isLoggedIn
    }
}

export function login() {
    return (dispatch, getState) => {
        if (shouldLogin(getState())) {
            return dispatch(fetchLogin())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    };
}